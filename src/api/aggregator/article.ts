import { SourceReference } from "@/api/aggregator/source";
import { FiltersQuery, useGetQuery, usePaginatedInfiniteQuery, usePaginatedQuery } from "@/api/shared";

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

export const useArticleDetails = (id: string) => {
    return useGetQuery<Article>(`/aggregator/articles/${id}`);
};

export const useArticleOverviewList = (filters: FiltersQuery = {}) => {
    return usePaginatedQuery<ArticleOverview>("/aggregator/articles", filters);
};

export const useInfiniteArticleOverviewList = (filters: FiltersQuery = {}) => {
    return usePaginatedInfiniteQuery<ArticleOverview>("/aggregator/articles", filters);
};
