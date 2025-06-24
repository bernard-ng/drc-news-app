import { endpoint } from "@/api/endpoint";
import {
    PasswordForgottenPayload,
    PasswordResetPayload,
    PasswordUpdatePayload,
} from "@/api/schema/identity-and-access/password";
import { usePostQuery, usePutQuery } from "@/api/shared";

export const usePasswordForgotten = () => {
    return usePostQuery<PasswordForgottenPayload>(endpoint.identityAndAccess.requestPassword);
};

export const usePasswordReset = (token: string) => {
    return usePostQuery<PasswordResetPayload>(endpoint.identityAndAccess.resetPassword(token));
};

export const usePasswordUpdate = () => {
    return usePutQuery<PasswordUpdatePayload>(endpoint.identityAndAccess.updatePassword);
};
