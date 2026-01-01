import { baseApi } from "../baseApi";

export const jobApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Authentication endpoints
        getJobs: builder.query({
            query: () => ({
                url: '/jobs',
                method: 'GET',
            }),
            providesTags: ["JOB"],
        }),
        deleteJobs: builder.mutation({
            query: ({id}) => ({
                url: `/jobs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["JOB"],
        }),
    }),
});
export const {
    useGetJobsQuery,
    useDeleteJobsMutation
} = jobApi