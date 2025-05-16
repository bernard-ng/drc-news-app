import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import qs from "qs";

import client from "@/api/client";

export type FiltersQuery = {
    dateRange?: {
        start: number;
        end: number;
    };
    page?: number;
    limit?: number;
    source?: string;
    search?: string;
};

export type Pagination = {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
};

export type ClientDetailErrorResponse = {
    type: string;
    title: string;
    detail: string;
    status: number;
};

export type ClientErrorResponse = {
    code: string;
    message: string;
};

export type ErrorResponse = AxiosError<ClientErrorResponse | ClientDetailErrorResponse>;

export type PaginatedResponse<TItem> = {
    items: TItem[];
    pagination: Pagination;
};

export const safeMessage = (error: AxiosError<ClientErrorResponse | ClientDetailErrorResponse> | Error): string => {
    if (error instanceof AxiosError && error.response) {
        const response = error.response.data;
        console.log(JSON.stringify(response));

        if ("message" in response) {
            return response.message;
        } else if ("detail" in response) {
            return response.detail;
        }
    }

    console.log(JSON.stringify(error));
    return "Une erreur est survenue";
};

export const usePaginatedInfiniteQuery = <TItem>(endpoint: string, filters: FiltersQuery = {}) => {
    return useInfiniteQuery<PaginatedResponse<TItem>, ErrorResponse>({
        initialData: undefined,
        initialPageParam: 1,
        queryKey: [endpoint, filters],
        queryFn: async ({ pageParam = 1 }) => {
            const query = qs.stringify({ ...filters, page: pageParam }, { skipNulls: true });
            const url = `${endpoint}?${query}`;
            const response = await client.get<PaginatedResponse<TItem>>(url);
            return response.data;
        },
        getNextPageParam: (lastPage: PaginatedResponse<TItem>) => {
            const { currentPage, totalPages } = lastPage.pagination;
            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        staleTime: 1_000 * 60 * 10,
    });
};

export const usePaginatedQuery = <TItem>(endpoint: string, filters: FiltersQuery = {}) => {
    return useQuery<PaginatedResponse<TItem>, ErrorResponse>({
        queryKey: [endpoint, filters],
        queryFn: async (): Promise<PaginatedResponse<TItem>> => {
            const query = qs.stringify({ ...filters, page: 1 }, { skipNulls: true });
            const url = `${endpoint}?${query}`;
            const response = await client.get<PaginatedResponse<TItem>>(url);
            return response.data;
        },
        staleTime: 1_000 * 60 * 10,
    });
};

export const useGetQuery = <TItem>(endpoint: string) => {
    return useQuery<TItem, ErrorResponse>({
        queryKey: [endpoint],
        queryFn: async (): Promise<TItem> => {
            const response = await client.get<TItem>(endpoint);
            return response.data;
        },
        staleTime: 1_000 * 60 * 10,
    });
};

export const usePostQuery = <TPayload = void, TResponse = void>(endpoint: string) => {
    return useMutation<TResponse, ErrorResponse, TPayload>({
        mutationFn: async (data: TPayload): Promise<TResponse> => {
            const response = await client.post<TResponse>(endpoint, data);
            return response.data;
        },
    });
};

export const usePutQuery = <TPayload = void, TResponse = void>(endpoint: string) => {
    return useMutation<TResponse, ErrorResponse, TPayload>({
        mutationFn: async (data: TPayload): Promise<TResponse> => {
            const response = await client.put<TResponse>(endpoint, data);
            return response.data;
        },
    });
};

export const useDeleteQuery = <TResponse = void>(endpoint: string) => {
    return useMutation<TResponse, ErrorResponse>({
        mutationFn: async (): Promise<TResponse> => {
            const response = await client.delete<TResponse>(endpoint);
            return response.data;
        },
    });
};
