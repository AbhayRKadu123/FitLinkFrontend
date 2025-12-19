import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './CustomBaseQuery';

export const WorkoutApi = createApi({
  reducerPath: 'WorkoutApi',
    baseQuery:customBaseQuery,

  
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

    GetUserWorkoutRoutin: builder.query({
      query: () => '/workout/getUserExercise'

    }),

    deleteRoutine: builder.mutation({
      query: (id) => ({
        url: `/workout/DeleteRoutin`,
        method: "DELETE",
        body: id
      }),
      invalidatesTags: ["Workout"],
    }),

    updateWorkoutRoutin: builder.mutation({
      query: (Data) => ({
        url: `/workout/UpdateRoutin/${Data?.id}`,      // your backend API endpoint
        method: 'PUT',        // sending data
        body: Data,      // data to send in request body
      }),

    }),

    AddWorkoutRoutin: builder.mutation({
      query: (newRoutine) => ({
        url: '/Workout/CustomWorkout',      // your backend API endpoint
        method: 'POST',        // sending data
        body: newRoutine,      // data to send in request body
      }),


      //   /workout/UpdateRoutin


    }),
    updateUserActiveWorkoutPlan: builder.mutation({
      query: (plantype) => ({
        url: '/Workout/updateUserActiveWorkoutPlan',      // your backend API endpoint
        method: 'PUT',        // sending data
        body: plantype,      // data to send in request body
      }),
    }),
    GetWorkoutSessoin: builder.query({
      query: ({ ID, NestedId, ReqDay }) => `/Workout/getworkoutsession?ID=${ID}&NestedId=${NestedId}&ReqDay=${ReqDay}`
    })
    ,
    GetLastSessionHistory:builder.query({

 query: ({SessionTitle,Currexercise,Day}) => `/Workout/GetLastSessionHistory?SessionTitle=${SessionTitle}&Currexercise=${Currexercise}&Day=${Day}`

    }),

    AddWorkoutSession: builder.mutation({
      query: (sessionobject) => ({
        url: '/Workout/addworkoutsession',      // your backend API endpoint
        method: 'POST',        // sending data
        body: sessionobject,      // data to send in request body
      }),


    }),
    GetDailySession: builder.query({
      query: ({ planType, Date, Title }) => `/workout/GetDailySession?plantype=${planType}&Date=${Date}&Title=${Title}`
    }),
     GetWorkoutHistory: builder.query({
    // GetWorkoutHistory
    query: ({ }) => `/workout/GetWorkoutHistory`




  }),
  GetWorkoutHistoryDetail:builder.query({
    query:({id})=>`/workout/WorkoutHistoryDetail?id=${id}`

  }),
  // useGetWorkoutBarChartDetailQuery
  GetWorkoutBarChartDetail:builder.query({
      query:({id})=>`/workout/GetWorkoutBarChartDetail?id=${id}`

  }),
  // GetUserProgress
   GetUserProgress:builder.query({
      query:(Date)=>`/workout/GetUserProgress?Date=${Date}`

  }),
    UpdateWorkoutSession: builder.mutation({
      query: (sessionobject) => ({
        url: '/Workout/UpdateWorkoutSession',      // your backend API endpoint
        method: 'PUT',        // sending data
        body: sessionobject,      // data to send in request body
      }),

    }),
    updateDailyWorkoutSession:builder.mutation({
      query:({TodayDate,ReqDay})=>({
        url:'/workout/DailyWorkoutSessionUpdate',
        method:'POST',
        body:{Date:TodayDate,ReqDay:ReqDay}

      })
    })
    // GenerateDailySession:


  }),
 

});

export const {useGetLastSessionHistoryQuery,useUpdateDailyWorkoutSessionMutation,useGetUserProgressQuery,  useGetWorkoutBarChartDetailQuery,useGetWorkoutHistoryDetailQuery,useGetWorkoutHistoryQuery, useUpdateWorkoutSessionMutation, useGetDailySessionQuery, useGetWorkoutSessoinQuery, useAddWorkoutRoutinMutation, useGetUserWorkoutRoutinQuery, useDeleteRoutineMutation, useUpdateWorkoutRoutinMutation, useUpdateUserActiveWorkoutPlanMutation, useAddWorkoutSessionMutation } = WorkoutApi;
