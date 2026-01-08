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
            query: ({ Id }) => `/User/getUserDetail?Id=${Id}`

        }),
        // getUserDetailLogin
        GetUserDetailLogin: builder.query({
            query: ({ Id }) => `/User/getUserDetailLogin?Id=${Id}`

        }),
        GetUserFeed: builder.query({
            query: () => '/User/GetUserFeed'
        }),
        GetAllFriendRequest: builder.query({
            query: () => '/Users/GetAllFriendRequest'
        }),
        // UserNotification
        GetUserNotification: builder.query({
            query: ({}) => '/User/UserNotifications'
        }),
        GetAllUserConversation:builder.query({
            query:({UserId,OtherUserId})=>`/User/GetAllUserConversation?UserId=${UserId}&&OtherUserId=${OtherUserId}`
        }),

        UpdateAddFriendUser: builder.mutation({
            query: ({ Id }) => ({
                url: `/User/AddFriendUser`,      // your backend API endpoint
                method: 'PUT',        // sending data
                body: { userId: Id },      // data to send in request body
            }),
            
       
            // /HandleDeleteMessage

        }),
        GetReplyMessage:builder.query({
        query:({MsgId})=>`/User/GetReplyMessage?MsgId=${MsgId}`

        }),
        GetPassword:builder.query({
        query:({MsgId})=>`/User/GetPassword?MsgId=${MsgId}`

        }),
        UploadImage:builder.mutation({
            query:({formData})=>({
                url:'/User/UploadImage',
                method:'POST',
                body:formData

            })

        }),
        UpdatePassword:builder.mutation({
            query: ({username,emaiL }) => ({
                url: `/User/UpdatePassword`,      // your backend API endpoint
                method: 'PUT',        // sending data
                body: { username,email },      // data to send in request body
            }),}),
        // /UpdatePassword
         HandleDeleteMessage: builder.mutation({
            query: ({ Id }) => ({
                url: `/User/HandleDeleteMessage`,      // your backend API endpoint
                method: 'DELETE',        // sending data
                body: { userId: Id },      // data to send in request body
            }),}),




// /GetReplyMessage

    })
})
export const {useUpdatePasswordMutation,useGetUserDetailLoginQuery,useUploadImageMutation,useHandleDeleteMessageMutation,useGetAllUserConversationQuery, useGetUserNotificationQuery, useGetAllFriendRequestQuery, useUpdateAddFriendUserMutation, useGetUserDetailsQuery, useGetUserFeedQuery,useGetReplyMessageQuery } = UserApi;