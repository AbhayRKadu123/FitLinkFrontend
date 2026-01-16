import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './CustomBaseQuery';



export const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: customBaseQuery,


    // name for the slice
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://localhost:8080',
        baseUrl: 'https://fitlink-vbdq.onrender.com',
        // const frontendUrl = process.env.FRONTEND_URL;



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
            query: ({ }) => '/User/UserNotifications'
        }),
        GetAllUserConversation: builder.query({
            query: ({ UserId, OtherUserId }) => `/User/GetAllUserConversation?UserId=${UserId}&&OtherUserId=${OtherUserId}`
        }),

        UpdateAddFriendUser: builder.mutation({
            query: ({ Id }) => ({
                url: `/User/AddFriendUser`,      // your backend API endpoint
                method: 'PUT',        // sending data
                body: { userId: Id },      // data to send in request body
            }),


            // /HandleDeleteMessage

        }),
        SendQuery:builder.mutation({
            query: ({Data}) => ({
                url: `/User/SendQuery`,      // your backend API endpoint
                method: 'POST',
                body:{Data}       // sending data
                     // data to send in request body
            }),


            // /HandleDeleteMessage

        }),
        GenerateCouponCode :builder.mutation({
            query: ({}) => ({
                url: `/User/GenerateCouponCode`,      // your backend API endpoint
                method: 'PUT',        // sending data
                body: { userId: "GenerateCode" },      // data to send in request body
            }),


            // /HandleDeleteMessage

        }),
        GetReplyMessage: builder.query({
            query: ({ MsgId }) => `/User/GetReplyMessage?MsgId=${MsgId}`

        }),
        GetProfileSettingUsersData: builder.query({
            query: () => '/User/ProfileSettingUserData',
            providesTags: ['UserProfile'],
        }),
        GetPassword: builder.query({
            query: ({ MsgId }) => `/User/GetPassword?MsgId=${MsgId}`

        }),
        UploadImage: builder.mutation({
            query: ({ formData }) => ({
                url: '/User/UploadImage',
                method: 'POST',
                body: formData

            })

        }),
        VerifyOtp: builder.mutation({
            query: (Data) => (
                {
                    // VerifyOtp
                    url: '/User/VerifyOtp',
                    method: 'POST',
                    body: Data


                }
            )
        }),
        HandleChangePassword: builder.mutation({
            query: (Data) => ({
                url: `/User/HandlePasswordChange`,      // your backend API endpoint
                method: 'POST',        // sending data
                body: Data,      // data to send in request body
            }),
        }),
        UpdatePassword: builder.mutation({
            query: ({ username, email }) => ({
                url: `/User/UpdatePassword`,      // your backend API endpoint
                method: 'PUT',        // sending data
                body: { username: username, email: email },      // data to send in request body
            }),
        }),
        // /UpdatePassword
        HandleDeleteMessage: builder.mutation({
            query: ({ Id }) => ({
                url: `/User/HandleDeleteMessage`,      // your backend API endpoint
                method: 'DELETE',        // sending data
                body: { userId: Id },      // data to send in request body
            }),
        }),
        UpdateProfileSetting: builder.mutation({
            query: (UserData) => ({
                url: `/User/ProfileSetting`,      // your backend API endpoint
                method: 'PUT',        // sending data
                body: UserData,      // data to send in request body
            }),
            // /ProfileSetting

        }),
        GetReferalCode:builder.query({
            query: () => '/User/GetReferalCode',
            providesTags: ['UserProfile'],
        }),
        // GetReferalCode





        // /GetReplyMessage

    })
})
export const {useSendQueryMutation,useGenerateCouponCodeMutation,useGetReferalCodeQuery, useGetProfileSettingUsersDataQuery, useUpdateProfileSettingMutation, useHandleChangePasswordMutation, useVerifyOtpMutation, useUpdatePasswordMutation, useGetUserDetailLoginQuery, useUploadImageMutation, useHandleDeleteMessageMutation, useGetAllUserConversationQuery, useGetUserNotificationQuery, useGetAllFriendRequestQuery, useUpdateAddFriendUserMutation, useGetUserDetailsQuery, useGetUserFeedQuery, useGetReplyMessageQuery } = UserApi;