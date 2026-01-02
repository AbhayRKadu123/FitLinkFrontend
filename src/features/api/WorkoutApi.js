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
    GetSelectedRoutineDays:builder.query({
      query:() =>`/workout/GetSelectedRoutineDays`
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
    DeleteWorkoutRoutineExerise:builder.mutation({
      query:(Data)=>({
        // DeleteWorkoutRoutineExerise
        url: `/workout/DeleteWorkoutRoutineExerise`,      // your backend API endpoint
        method: 'PUT',        // sending data
        body: Data,      // data to send in request body
      })

    }),
     UpdateUserWorkoutHistory: builder.mutation({
  query: ({ id, Exercises }) => ({
    url: `/workout/UpdateUserWorkoutHistory`,
    method: 'PUT',
    body: { id, Exercises }
  }),
  invalidatesTags: ["WorkoutHistory"]
}),


    AddWorkoutRoutin: builder.mutation({
      query: (newRoutine) => ({
        url: '/Workout/CustomWorkout',      // your backend API endpoint
        method: 'POST',        // sending data
        body: newRoutine,      // data to send in request body
      }),


      //   /workout/UpdateRoutin


    }),
    // AddselectedRoutineDays
     AddselectedRoutineDays: builder.mutation({
      query: ({DaysArray}) => ({
        url: '/Workout/AddselectedRoutineDays',      // your backend API endpoint
        method: 'POST',        // sending data
        body: DaysArray,      // data to send in request body
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
    }),
    GetAllExercisesLastSessionHistory:builder.query({
      query:({SessionTitle,Day})=>`/workout/GetAllExercisesLastSessionHistory?SessionTitle=${SessionTitle}&Day=${Day}`

    }),
    getstoredselectedRoutineDays:builder.query({
      // /storedselectedRoutineDays
       query:({})=>`/workout/storedselectedRoutineDays`

    }),
    UpdateSelectedRoutinedays:builder.mutation({
        query: (DaysArray) => ({url: '/Workout/UpdateSelectedRoutinedays',      // your backend API endpoint
        method: 'PUT',        // sending data
        body: DaysArray, })     // data to send in request body

    }),
   UpdateCustomWorkoutPlan:builder.mutation({
        query: ({Id,formData}) => ({url: `/Workout/UpdateCustomWorkoutPlan?Id=${Id}`,      // your backend API endpoint
        method: 'PUT', 
        body:formData       // sending data
         })     // data to send in request body

    }),
  //  /UpdateCustomWorkoutPlan
    // /UpdateSelectedRoutinedays
    // GenerateDailySession:


  }),
 

});

export const {useDeleteWorkoutRoutineExeriseMutation,useUpdateCustomWorkoutPlanMutation,useUpdateSelectedRoutinedaysMutation,useGetSelectedRoutineDaysQuery,useGetstoredselectedRoutineDaysQuery,useAddselectedRoutineDaysMutation,useGetAllExercisesLastSessionHistoryQuery,useGetLastSessionHistoryQuery,useUpdateDailyWorkoutSessionMutation,useGetUserProgressQuery,  useGetWorkoutBarChartDetailQuery,useGetWorkoutHistoryDetailQuery,useGetWorkoutHistoryQuery, useUpdateWorkoutSessionMutation, useGetDailySessionQuery, useGetWorkoutSessoinQuery, useAddWorkoutRoutinMutation, useGetUserWorkoutRoutinQuery, useDeleteRoutineMutation, useUpdateWorkoutRoutinMutation, useUpdateUserActiveWorkoutPlanMutation, useAddWorkoutSessionMutation,useUpdateUserWorkoutHistoryMutation} = WorkoutApi;
