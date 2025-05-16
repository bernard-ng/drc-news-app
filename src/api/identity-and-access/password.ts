import { usePostQuery, usePutQuery } from "@/api/shared";

export type PasswordForgottenData = {
    email: string;
};

export type PasswordResetData = {
    password: string;
    confirm: string;
};

export type PasswordUpdateData = {
    current: string;
    password: string;
    confirm: string;
};

export const usePasswordForgotten = () => {
    return usePostQuery<PasswordForgottenData>("/password/request");
};

export const usePasswordReset = (token: string) => {
    return usePostQuery<PasswordResetData>(`/password/reset/${token}`);
};

export const usePasswordUpdate = () => {
    return usePutQuery<PasswordUpdateData>("/password/update");
};
