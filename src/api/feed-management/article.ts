import { SourceReference } from "@/api/feed-management/source";
import { ArticleFilters, useGetQuery, usePaginatedInfiniteQuery, usePaginatedQuery } from "@/api/shared";

export type ArticleOverview = {
    id: string;
    title: string;
    link: string;
    categories: string[];
    excerpt: string;
    source: SourceReference;
    publishedAt: string;
    image?: string;
    readingTime: number;
    bookmarked: boolean;
};

export type Article = {
    id: string;
    title: string;
    link: string;
    categories: string[];
    body: string;
    source: SourceReference;
    hash: string;
    credibility: {
        bias: "neutral" | "slightly" | "partisan" | "extreme";
        reliability: "trusted" | "reliable" | "average" | "unreliable" | "low_trust";
        transparency: "low" | "medium" | "high";
    };
    sentiment: "negative" | "positive" | "neutral";
    metadata?: {
        title?: string;
        description?: string;
        image?: string;
        video?: string;
        audio?: string;
        locale?: string;
    };
    readingTime: number;
    publishedAt: string;
    crawledAt: string;
    updatedAt: string;
    bookmarked: boolean;
};

export type TrendingArticle = ArticleOverview;

export const useArticleTrendingList = (filters: ArticleFilters = {}) => {
    return usePaginatedQuery<TrendingArticle>("/feed/trending", filters);
};

export const useArticleDetails = (articleId: string) => {
    return useGetQuery<Article>(`/feed/articles/${articleId}`);
};

export const useArticleOverviewList = (filters: ArticleFilters = {}) => {
    return usePaginatedQuery<ArticleOverview>("/feed/articles", filters);
};

export const useInfiniteArticleOverviewList = (filters: ArticleFilters = {}) => {
    return usePaginatedInfiniteQuery<ArticleOverview>("/feed/articles", filters);
};
