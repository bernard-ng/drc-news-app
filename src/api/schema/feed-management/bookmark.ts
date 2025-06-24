import { ArticleOverview } from "@/api/schema/feed-management/article";

export type BookmarkPayload = {
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
