import { FiltersQuery, PaginatedResponse, useGetQuery, usePaginatedInfiniteQuery } from "@/api/shared";

export type SourceOverview = {
    articles: number;
    source: string;
    url: string;
    crawledAt: string;
    updatedAt?: string;
    followed: boolean;
};

export type SourceDetails = {
    source: string;
    url: string;
    followed: boolean;
    credibility: {
        bias: "neutral" | "slightly" | "partisan" | "extreme";
        reliability: "trusted" | "reliable" | "average" | "unreliable" | "low_trust";
        transparency: "low" | "medium" | "high";
    };
    publicationsGraph: {
        date: string;
        count: number;
    }[];
    categoriesShares: {
        name: string;
        count: number;
        percentage: number;
    }[];
    categories: number;
    articles: number;
    crawledAt: string;
    updatedAt?: string;
};

export type SourceOverviewList = PaginatedResponse<SourceOverview>;

export const useSourceDetails = (source: string) => {
    return useGetQuery<SourceDetails>(`/aggregator/sources/${source}`);
};

export const useSourceOverviewList = (filters: FiltersQuery = {}) => {
    return usePaginatedInfiniteQuery<SourceOverview>("/aggregator/sources", filters);
};
