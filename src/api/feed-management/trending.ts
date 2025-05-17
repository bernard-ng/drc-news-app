import { ArticleOverview } from "@/api/aggregator/article";
import { FiltersQuery, usePaginatedQuery } from "@/api/shared";

export type TrendingArticle = ArticleOverview;

export const useArticleTrendingList = (filters: FiltersQuery = {}) => {
    return usePaginatedQuery<TrendingArticle>("/feed/trending", filters);
};
