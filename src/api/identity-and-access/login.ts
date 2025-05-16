import { usePostQuery } from "@/api/shared";

export type LoginData = {
    username: string;
    password: string;
};

export type LoginResponse = {
    token: string;
    refresh_token: string;
};

export type RefreshTokenData = {
    refresh_token: string;
};

export type RefreshTokenResponse = {
    token: string;
};

export const useLogin = () => {
    return usePostQuery<LoginData, LoginResponse>("/login_check");
};

export const useLogout = () => {
    return usePostQuery("/token/invalidate");
};
