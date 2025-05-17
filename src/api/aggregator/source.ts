import { ArticleOverview } from "@/api/aggregator/article";
import { FiltersQuery, useGetQuery, usePaginatedInfiniteQuery } from "@/api/shared";

export type SourceOverview = {
    articles: number;
    source: string;
    url: string;
    image: string;
    crawledAt: string;
    updatedAt?: string;
    followed: boolean;
};

export type SourceDetails = {
    source: string;
    url: string;
    followed: boolean;
    image: string;
    credibility: {
        bias: "neutral" | "slightly" | "partisan" | "extreme";
        reliability: "trusted" | "reliable" | "average" | "unreliable" | "low_trust";
        transparency: "low" | "medium" | "high";
    };
    publicationGraph: {
        date: string;
        count: number;
    }[];
    categoryShares: {
        name: string;
        count: number;
        percentage: number;
    }[];
    categories: number;
    articles: number;
    crawledAt: string;
    updatedAt?: string;
};

export const useSourceDetails = (source: string) => {
    return useGetQuery<SourceDetails>(`/aggregator/sources/${source}`);
};

export const useSourceOverviewList = (filters: FiltersQuery = {}) => {
    return usePaginatedInfiniteQuery<SourceOverview>("/aggregator/sources", filters);
};

export const useSourceArticleOverviewList = (source: string, filters: FiltersQuery = {}) => {
    return usePaginatedInfiniteQuery<ArticleOverview>(`/aggregator/sources/${source}/articles`, filters);
};
