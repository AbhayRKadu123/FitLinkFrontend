import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const WeightTrackingApi = createApi({
    reducerPath: "WeightTrackingApi",

    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:8080",
        baseUrl: "https://fitlink-vbdq.onrender.com",

        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),

    endpoints: (builder) => ({
        // GET Weight Graph
        GetUserWeightChart: builder.query({
            query: ({ TodaysDate }) => `/GetUserWeight/GetUserWeightGraph?TodaysDate=${TodaysDate}`,
        }),
        GetAllWeightGraphandDetail: builder.query({
            query: ({ }) => `/GetUserWeight/GetAllWeightGraphandDetail`,
        }),
        // ADD Weight Entry
        AddUserWeight: builder.mutation({
            query: (body) => ({
                url: "/GetUserWeight/AddWeight",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useGetUserWeightChartQuery,
    useAddUserWeightMutation,
    useGetAllWeightGraphandDetailQuery
} = WeightTrackingApi;
