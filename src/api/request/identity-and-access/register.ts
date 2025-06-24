import { endpoint } from "@/api/endpoint";
import { RegisterData } from "@/api/schema/identity-and-access/register";
import { useGetQuery, usePostQuery } from "@/api/shared";

export const useRegister = () => {
    return usePostQuery<RegisterData>(endpoint.identityAndAccess.register);
};

export const useConfirmAccount = (token: string) => {
    return useGetQuery(endpoint.identityAndAccess.confirmAccount(token));
};
