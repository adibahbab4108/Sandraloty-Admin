import { axiosBaseQuery } from '@/redux/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const professionalsApi = createApi({
  reducerPath: 'professionalsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Auth', 'User', 'Profile'],
  endpoints: (builder) => ({
    // Authentication endpoints
    getProfessionals: builder.query({
      query: () => ({
        url: '/contractors',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    // ...... above all ar updated

    user: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetProfessionalsQuery,
  useUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = professionalsApi;
