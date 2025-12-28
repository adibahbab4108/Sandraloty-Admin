import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from './features/baseApi';

// export const store = configureStore({
//   reducer: {
//     // auth: persistedAuthReducer,
//     // [authApi.reducerPath]: authApi.reducer,
//     [professionalsApi.reducerPath]: professionalsApi.reducer,
//     [clientApi.reducerPath]: clientApi.reducer,
//     [plansApi.reducerPath]: plansApi.reducer,
//     [employeesApi.reducerPath]: employeesApi.reducer,

//     [coursesApi.reducerPath]: coursesApi.reducer,
//     [modulesApi.reducerPath]: modulesApi.reducer,
//     [contentApi.reducerPath]: contentApi.reducer,
//     [transactionsApi.reducerPath]: transactionsApi.reducer,
//     [statsApi.reducerPath]: statsApi.reducer,
//     [certificateApi.reducerPath]: certificateApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat([
//       // authApi.middleware,
//       professionalsApi.middleware,
//       clientApi.middleware,
//       plansApi.middleware,
//       employeesApi.middleware,

//       coursesApi.middleware,
//       modulesApi.middleware,
//       contentApi.middleware,
//       transactionsApi.middleware,
//       certificateApi.middleware,
//       statsApi.middleware, 
//     ]),
// });

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
