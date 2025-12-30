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
        deleteSubscriptionPlan: builder.mutation({
            query: (id) => ({
                url: `/subscriptions/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["SUBSCRIPTION"],
        }),
        createSubscriptionPlan: builder.mutation({
            query: (data) => ({
                url: `/subscriptions`,
                method: 'POST',
                data
            }),
            invalidatesTags: ["SUBSCRIPTION"],
        }),
    }),
});

export const {
    useGetSubscriptionsQuery,
    useCreateSubscriptionPlanMutation,
    useUpdateSubscriptionsMutation,
    useDeleteSubscriptionPlanMutation
} = subscriptionApi;
