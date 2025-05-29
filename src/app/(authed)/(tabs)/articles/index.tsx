import React from "react";

import { ScrollView, YStack } from "tamagui";

import { ArticleOverview, useArticleOverviewList } from "@/api/feed-management/article";
import { SourceOverview, useSourceOverviewList } from "@/api/feed-management/source";
import { useFlattenedItems } from "@/hooks/use-flattened-items";
import { ArticleList, ArticleSkeletonList } from "@/ui/components/content/article";
import { SourceList, SourceSkeletonList } from "@/ui/components/content/source";
import { ScreenView } from "@/ui/components/layout";
import { Heading } from "@/ui/components/typography";

export default function Index() {
    const { data: articles, isLoading: articlesLoading } = useArticleOverviewList({ limit: 10 });
    const { data: sources, isLoading: sourcesLoading } = useSourceOverviewList();
    const articleOverviews: ArticleOverview[] = useFlattenedItems(articles);
    const sourcesOverviews: SourceOverview[] = useFlattenedItems(sources);

    return (
        <ScreenView paddingBottom={0}>
            <Heading>Actualités</Heading>
            <ScrollView contentContainerStyle={{ paddingBottom: 0 }}>
                <YStack gap="$4">
                    <YStack gap="$2">
                        <ScreenView.Section title="Tendances" forwardLink="/(authed)/(tabs)/articles/trending" />

                        {articlesLoading && <ArticleSkeletonList displayMode="card" horizontal={true} />}
                        {!articlesLoading && (
                            <ArticleList
                                data={articleOverviews}
                                refreshing={articlesLoading}
                                displayMode="card"
                                horizontal={true}
                            />
                        )}
                    </YStack>
                    <YStack gap="$2">
                        <ScreenView.Section title="Nos sources" forwardLink="/(authed)/(tabs)/sources" />

                        {sourcesLoading && <SourceSkeletonList horizontal={true} />}
                        {!sourcesLoading && (
                            <SourceList data={sourcesOverviews} refreshing={sourcesLoading} horizontal={true} />
                        )}
                    </YStack>
                </YStack>
            </ScrollView>
        </ScreenView>
    );
}
