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
            query: ({Id}) => `/User/getUserDetail?Id=${Id}`

        }),
        GetUserFeed:builder.query({
            query:()=>'/User/GetUserFeed'
        }),
         GetAllFriendRequest:builder.query({
            query:()=>'/Users/GetAllFriendRequest'
    }),
         UpdateAddFriendUser: builder.mutation({
      query: ({Id}) => ({
        url: `/User/AddFriendUser`,      // your backend API endpoint
        method: 'PUT',        // sending data
        body: {userId:Id},      // data to send in request body
      }),

    }),
   



    })
})
    export const {useGetAllFriendRequestQuery,useUpdateAddFriendUserMutation, useGetUserDetailsQuery,useGetUserFeedQuery } = UserApi;