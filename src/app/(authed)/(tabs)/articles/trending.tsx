import React from "react";

import { useRouter } from "expo-router";

import { useInfiniteArticleOverviewList } from "@/api/aggregator/article";
import { TrendingArticle } from "@/api/feed-management/trending";
import useFlattenedItems from "@/hooks/useFlattenedItems";
import ArticleList from "@/ui/components/content/article/ArticleList";
import ArticleSkeletonList from "@/ui/components/content/article/ArticleSkeleton";
import BackButton from "@/ui/components/controls/BackButton";
import ScreenView from "@/ui/components/layout/ScreenView";

export default function Trending() {
    const router = useRouter();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch } = useInfiniteArticleOverviewList(
        { limit: 20 }
    );
    const articles: TrendingArticle[] = useFlattenedItems(data);

    return (
        <ScreenView paddingBottom={0}>
            <ScreenView.Heading
                leadingAction={<BackButton onPress={() => router.dismissTo("/(authed)/(tabs)/articles")} />}
                title="Actualités"
            />

            {isLoading && <ArticleSkeletonList displayMode="magazine" />}
            {!isLoading && (
                <ArticleList
                    data={articles}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    refreshing={isLoading}
                    onRefresh={refetch}
                    infiniteScroll={true}
                />
            )}
        </ScreenView>
    );
}
