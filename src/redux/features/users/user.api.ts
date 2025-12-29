import { baseApi } from '../baseApi';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Authentication endpoints
        getUsers: builder.query({
            query: () => ({
                url: '/admin-user',
                method: 'GET',
            }),
            providesTags: ["USER"],
        }),
       
    }),
});

export const {
    useGetUsersQuery,
} = userApi;
