import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './CustomBaseQuery';

export const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: customBaseQuery,


    // name for the slice
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://localhost:8080',
        baseUrl: 'https://fitlink-vbdq.onrender.com',



        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            console.log('token', token)// 👈 get token
            if (token) {
                headers.set("authorization", `Bearer ${token}`); // 👈 attach token
            }
            return headers;
        },



    }),
    endpoints: (builder) => ({

        GetUserDetails: builder.query({
            query: () => '/User/getUserDetail'

        }),
        GetUserFeed:builder.query({
            query:()=>'/User/GetUserFeed'
        })



    })
})
    export const { useGetUserDetailsQuery,useGetUserFeedQuery } = UserApi;