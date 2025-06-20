import { ArticleOverview } from "@/api/feed-management/article";
import { ArticleFilters, useDeleteQuery, usePaginatedInfiniteQuery, usePostQuery, usePutQuery } from "@/api/shared";

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

export const useBookmarkList = (filters: ArticleFilters = {}) => {
    return usePaginatedInfiniteQuery<Bookmark>("/feed/bookmarks", filters);
};

export const useBookmarkedArticlesList = (bookmarkId: string, filters: ArticleFilters = {}) => {
    const endpoint = `/feed/bookmarks/${bookmarkId}/articles`;
    return usePaginatedInfiniteQuery<BookmarkedArticle>(endpoint, filters);
};
