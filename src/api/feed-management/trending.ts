import { ArticleOverview } from "@/api/aggregator/article";
import { FiltersQuery, PaginatedResponse, usePaginatedQuery } from "@/api/shared";

export type TrendingArticle = ArticleOverview;
export type TrendingArticlesList = PaginatedResponse<TrendingArticle>;

export const useArticleTrendingList = (filters: FiltersQuery = {}) => {
    return usePaginatedQuery<TrendingArticle>("/feed/trending", filters);
};
