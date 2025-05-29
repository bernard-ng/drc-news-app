import { usePostQuery } from "@/api/shared";

export type RegisterData = {
    name: string;
    email: string;
    password: string;
};

export const useRegister = () => {
    return usePostQuery<RegisterData>("/register");
};
