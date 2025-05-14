import {Button, H5, Image, Paragraph, ScrollView, Separator, XStack, YStack} from "tamagui";
import ScreenView from "@/ui/components/layout/ScreenView";
import {Bookmark, MoreVertical, Share} from "@tamagui/lucide-icons";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useArticleDetails} from "@/api/request";
import LoadingView from "@/ui/components/LoadingView";
import Toast from "react-native-toast-message";
import * as WebBrowser from "expo-web-browser";
import {safeMessage} from "@/api/api";
import BackButton from "@/ui/components/controls/BackButton";
import IconButton from "@/ui/components/controls/IconButton";
import {useRelativeTime} from "@/hooks/useRelativeTime";
import Caption from "@/ui/components/typography/Caption";
import ArticleSourcePill from "@/ui/components/content/article/ArticleSourcePill";
import ArticleCategoryPill from "@/ui/components/content/article/ArticleCategoryPill";

export default function ArticleDetails() {
    const router = useRouter();
    const {id} = useLocalSearchParams();
    const {data, isLoading, error} = useArticleDetails(id as string);
    const article = data ?? undefined;
    const relativeTime = useRelativeTime(article?.publishedAt);

    const handleReadIntegrality = async () => {
        await WebBrowser.openBrowserAsync(article!.link)
    }

    if (error) {
        Toast.show((
            {
                type: "error",
                text1: "Erreur",
                text2: safeMessage(error)
            }
        ))
        router.replace("/(authed)/(tabs)/articles");
    }

    if (isLoading || article === undefined) {
        return <LoadingView/>
    }

    return (
        <ScreenView>
            <ScreenView.Heading
                leadingAction={<BackButton onPress={() => router.dismissTo('/(authed)/(tabs)/articles')}/>}
                trailingActions={
                    <>
                        <IconButton onPress={() => {
                        }} icon={<Bookmark size="$1"/>}/>
                        <IconButton onPress={() => {
                        }} icon={<Share size="$1"/>}/>
                        <IconButton onPress={() => {
                        }} icon={<MoreVertical size="$1"/>}/>
                    </>
                }
            />
            <ScrollView>
                <YStack>
                    {article.metadata?.image && (
                        <Image
                            borderRadius="$4"
                            source={{uri: article.metadata.image, cache: 'force-cache'}}
                            objectFit="cover"
                            width="100%"
                            height="225"
                            backgroundColor="$gray10"
                            marginBottom="$4"
                        />
                    )}
                </YStack>
                <YStack gap="$4" backgroundColor="$background">
                    <XStack gap="$2" flexWrap="wrap">
                        {article.categories.map((category, index) => (
                            <ArticleCategoryPill key={index} category={category.toLowerCase()}/>
                        ))}
                    </XStack>
                    <H5 fontWeight="bold" marginBottom="$1">
                        {article.title}
                    </H5>

                    <YStack gap="$2">
                        <ArticleSourcePill source={article.source}/>
                        <XStack height={20} alignItems="center">
                            <Caption>{relativeTime}</Caption>
                            <Separator alignSelf="stretch" vertical marginHorizontal={16}/>
                            <Caption>{article.readingTime} minutes de lecture</Caption>
                        </XStack>
                    </YStack>

                    <Paragraph size="$3" marginTop="$2">
                        {article.body.trim()}
                    </Paragraph>
                </YStack>
                <Button width="100%" onPress={handleReadIntegrality} theme="accent" fontWeight="bold">
                    Consulter l'article
                </Button>
            </ScrollView>
        </ScreenView>
    );
}
