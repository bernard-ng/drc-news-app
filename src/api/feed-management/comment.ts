import { useDeleteQuery, usePostQuery, usePaginatedInfiniteQuery } from "@/api/shared";

export type Comment = {
    id: string;
    content: string;
    user: {
        id: string;
        name: string;
    };
    sentiment: "positive" | "neutral" | "negative";
    createdAt: string;
};

export type CommentData = {
    content: string;
};

export const useArticleCommentList = (articleId: string) => {
    return usePaginatedInfiniteQuery<Comment>(`/feed/articles/${articleId}/comments`);
};

export const useAddCommentToArticle = (articleId: string) => {
    return usePostQuery<CommentData>(`/feed/articles/${articleId}/comments`);
};

export const useRemoveCommentFromArticle = (articleId: string, commentId: string) => {
    return useDeleteQuery(`/feed/articles/${articleId}/comments/${commentId}`);
};
