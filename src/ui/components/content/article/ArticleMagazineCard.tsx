import React from "react";

import { Link } from "expo-router";
import { Card, Paragraph, XStack, YStack } from "tamagui";

import { ArticleOverview } from "@/api/aggregator/article";
import { useRelativeTime } from "@/hooks/useRelativeTime";
import ArticleCoverImage from "@/ui/components/content/article/ArticleCoverImage";
import ArticleSourcePill from "@/ui/components/content/article/ArticleSourcePill";
import Caption from "@/ui/components/typography/Caption";

type ArticleMagazineCardProps = {
    data: ArticleOverview;
};

export function ArticleMagazineCard(props: ArticleMagazineCardProps) {
    const { data } = props;
    const relativeTime = useRelativeTime(data.publishedAt);

    return (
        <Card width="100%" backgroundColor="transparent" borderRadius="$4" padding={0}>
            <Link href={`/(authed)/(tabs)/articles/${data.id}`}>
                <XStack flexDirection="row" gap="$3" alignItems="center">
                    <YStack flex={1} gap="$2">
                        <Paragraph numberOfLines={2} fontWeight="600" fontSize="$5">
                            {data.title}
                        </Paragraph>
                        <Paragraph size="$3" numberOfLines={2} color="$colorHover">
                            {data.excerpt}
                        </Paragraph>
                    </YStack>

                    {data.image && <ArticleCoverImage uri={data.image} width={120} height={90} />}
                </XStack>
            </Link>

            <YStack marginTop="$3">
                <XStack justifyContent="space-between" alignItems="center">
                    <ArticleSourcePill source={data.source} />
                    <Caption>{relativeTime}</Caption>
                </XStack>
            </YStack>
        </Card>
    );
}
