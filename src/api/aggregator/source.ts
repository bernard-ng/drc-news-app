import { ArticleOverview } from "@/api/aggregator/article";
import { FiltersQuery, useGetQuery, usePaginatedInfiniteQuery } from "@/api/shared";

export type SourceReference = {
    name: string;
    displayName?: string;
    image: string;
    url: string;
};

export type SourceOverview = {
    name: string;
    url: string;
    articlesCount: number;
    crawledAt: string;
    displayName?: string;
    updatedAt?: string;
    metadataAvailable: number;
    followed: boolean;
    image: string;
};

export type SourceDetails = {
    name: string;
    url: string;
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
    articlesCount: number;
    crawledAt: string;
    displayName?: string;
    description?: string;
    updatedAt?: string;
    metadataAvailable: number;
    followed: boolean;
    image: string;
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
