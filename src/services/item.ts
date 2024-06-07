import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Item, itemApiResponse, Pagination } from "src/types/api";
import.meta.env.VITE_BASE_URL;

export const itemsApi = createApi({
  reducerPath: "itemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "/api/v1/",
  }),
  tagTypes: ["Item"],
  endpoints: (builder) => ({
    getAllItems: builder.query<itemApiResponse, Pagination>({
      query: ({ pageIndex, pageSize }) => ({
        url: `/items?pageIndex=${+pageIndex}&pageSize=${+pageSize}`,
        method: "GET",
      }),
      providesTags: ["Item"],
    }),
    addItem: builder.mutation<string, Item>({
      query: (body) => ({
        url: "/items",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Item"],
    }),
    editItem: builder.mutation<string, Item>({
      query: (body) => ({
        url: "items/",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Item"],
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: "/items/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"],
    }),
    getItem: builder.query({
      query: (id) => ({
        url: `/items/${id}`,
        method: "GET",
      }),
    }),
    getAllItemsId: builder.query({
      query: () => ({
        url: "/ids",
        method: "GET",
      }),
      providesTags: ["Item"],
    }),
    getReport: builder.query({
      query: () => ({
        url: "/report",
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetAllItemsQuery,
  useAddItemMutation,
  useEditItemMutation,
  useDeleteItemMutation,
  useGetItemQuery,
  useGetAllItemsIdQuery,
  useLazyGetReportQuery
} = itemsApi;
