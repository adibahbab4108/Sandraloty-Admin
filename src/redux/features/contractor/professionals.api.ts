
import { baseApi } from '../baseApi';

export const professionalsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Authentication endpoints
    getProfessionalDetails: builder.query({
      query: () => ({
        url: '/contractors',
        method: 'GET',
      }),
      providesTags: ['USER'],
    }),

  }),
})


export const {
  useGetProfessionalDetailsQuery,
} = professionalsApi;
