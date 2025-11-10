import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'api', // name for the slice
    // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),

    endpoints: (builder) => ({


        AddUserLogin: builder.mutation({
            query: (Login) => ({
                url: '/login',      // your backend API endpoint
                method: 'POST',        // sending data
                body: Login,      // data to send in request body
            }),
            


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

export const { useAddUserLoginMutation,useAddUserSignUpMutation } = authApi;


