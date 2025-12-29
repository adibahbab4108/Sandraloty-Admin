import { baseApi } from '../baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userinfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userinfo
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
  })
});

// Export hooks for components
export const {
  useLoginMutation,
  useLogoutMutation
} = authApi;
