import { useDeleteQuery, usePostQuery } from "@/api/shared";

export const useFollowSource = (source: string) => {
    return usePostQuery(`/feed/sources/${source}/follow`);
};

export const useUnfollowSource = (source: string) => {
    return useDeleteQuery(`/feed/sources/${source}/unfollow`);
};
