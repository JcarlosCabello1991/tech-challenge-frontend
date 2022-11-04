import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Response<T> {
  ok: boolean;
  data: T;
}

export const gifsAPI = createApi({
  reducerPath: "gifsAPI",
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:4000"}),
  tagTypes:['gif'],
  endpoints: (builder) => ({
    getGifsDataBase: builder.query<Response<any>,any>({
      query: (category) => `/gifsDB/${category}`,
      providesTags:['gif']
    }),
    uploadGifs:builder.mutation<Response<any>,any>({
      query: (body)=>({
        url:'/gifsDB/upload',
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(body),
      }),
      invalidatesTags:['gif']
    }),
    deleteGif: builder.mutation<Response<any>, any>({
      query: (id) => ({
        url:`/gifsDB/delete/${id}`,
        method:'DELETE'
      }),
      invalidatesTags:['gif']
    }),
    updateGif: builder.mutation<Response<any>, any>({
      query: (body) => ({
        url:`/gifsDB/update`,
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(body)
      }),
      invalidatesTags:['gif']
    }),
  })
})

export const {useGetGifsDataBaseQuery,useUploadGifsMutation, useDeleteGifMutation, useUpdateGifMutation} = gifsAPI;