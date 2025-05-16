import { ArticleOverview } from "@/api/aggregator/article";
import {
    FiltersQuery,
    PaginatedResponse,
    useDeleteQuery,
    usePaginatedInfiniteQuery,
    usePostQuery,
    usePutQuery,
} from "@/api/shared";

export type BookmarkData = {
    name: string;
    description?: string;
    isPublic: boolean;
};

export type Bookmark = {
    id: string;
    name: string;
    createdAt: string;
    description?: string;
    articlesCount: number;
    isPublic: boolean;
    updatedAt?: string;
};

export type BookmarkedArticle = ArticleOverview;
export type BookmarkedArticlesList = PaginatedResponse<BookmarkedArticle>;
export type BookmarkList = PaginatedResponse<Bookmark>;

export const useCreateBookmark = () => {
    return usePostQuery<BookmarkData>(`/feed/bookmarks`);
};

export const useUpdateBookmark = (bookmarkId: string) => {
    return usePutQuery<BookmarkData>(`/feed/bookmarks/${bookmarkId}`);
};

export const useDeleteBookmark = (bookmarkId: string) => {
    return useDeleteQuery(`/feed/bookmarks/${bookmarkId}`);
};

export const useAddArticleToBookmark = (bookmarkId: string, articleId: string) => {
    return usePostQuery(`/feed/bookmarks/${bookmarkId}/articles/${articleId}`);
};

export const useRemoveArticleFromBookmark = (bookmarkId: string, articleId: string) => {
    return useDeleteQuery(`/feed/bookmarks/${bookmarkId}/articles/${articleId}`);
};

export const useBookmarkList = (filters: FiltersQuery = {}) => {
    return usePaginatedInfiniteQuery<Bookmark>("/feed/bookmarks", filters);
};

export const useBookmarkedArticlesList = (bookmarkId: string, filters: FiltersQuery = {}) => {
    const endpoint = `/feed/bookmarks/${bookmarkId}/articles`;
    return usePaginatedInfiniteQuery<BookmarkedArticle>(endpoint, filters);
};
