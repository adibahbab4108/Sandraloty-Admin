import { baseApi } from '../baseApi';

export const subscriptionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSubscriptions: builder.query({
            query: () => ({
                url: '/subscriptions',
                method: 'GET',
            }),
            providesTags: ["SUBSCRIPTION"],
        }),
        updateSubscriptions: builder.mutation({
            query: ({ id, data }) => ({
                url: `/subscriptions/${id}`,
                method: 'PUT',
                data
            }),
            invalidatesTags: ["SUBSCRIPTION"],
        }),
    }),
});

export const {
    useGetSubscriptionsQuery,
    useUpdateSubscriptionsMutation
} = subscriptionApi;
