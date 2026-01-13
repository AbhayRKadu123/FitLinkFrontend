import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'api', // name for the slice
    // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fitlink-vbdq.onrender.com' }),

    endpoints: (builder) => ({


        AddUserLogin: builder.mutation({
            query: (Login) => ({
                url: '/login',      // your backend API endpoint
                method: 'POST',        // sending data
                body: Login,      // data to send in request body
            }),
            


        }),
        UpdateOldPassword:builder.mutation({
            query:(UpdatedPassword)=>({
                url: '/UpdateOldPassword',      // your backend API endpoint
                method: 'PUT',        // sending data
                body: UpdatedPassword, 

            })


        }),
        AddUserSignUp: builder.mutation({
            query: (signup) => ({
                url: '/signup',      // your backend API endpoint
                method: 'POST',        // sending data
                body: signup,      // data to send in request body
            }),
            


        })
    }),
});

export const { useUpdateOldPasswordMutation,useAddUserLoginMutation,useAddUserSignUpMutation } = authApi;


