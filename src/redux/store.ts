// src/app/store.ts
import {configureStore} from '@reduxjs/toolkit';
// import authReducer from '@/features/auth/authSlice';


import {
  // persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { plansApi } from './features/plans/plansApi';
import { professionalsApi } from './features/professionals/professionals.api';
import { clientApi } from './features/client/client.api';
import { employeesApi } from './features/employees/employeesApi';
import { coursesApi } from './features/courses/coursesApi';
import { modulesApi } from './features/modules/modulesApi';
import { contentApi } from './features/content/contentApi';
import { transactionsApi } from './features/transactions/transactionsApi';
import { statsApi } from './features/stats/statsApi';
import { certificateApi } from './features/certificate/certificateApi';


export const store = configureStore({
  reducer: {
    // auth: persistedAuthReducer,
    // [authApi.reducerPath]: authApi.reducer,
    [professionalsApi.reducerPath]: professionalsApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [plansApi.reducerPath]: plansApi.reducer,
    [employeesApi.reducerPath]: employeesApi.reducer,

    [coursesApi.reducerPath]: coursesApi.reducer,
    [modulesApi.reducerPath]: modulesApi.reducer,
    [contentApi.reducerPath]: contentApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [certificateApi.reducerPath]: certificateApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      // authApi.middleware,
      professionalsApi.middleware,
      clientApi.middleware,
      plansApi.middleware,
      employeesApi.middleware,

      coursesApi.middleware,
      modulesApi.middleware,
      contentApi.middleware,
      transactionsApi.middleware,
      certificateApi.middleware,
      statsApi.middleware, 
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const persistor = persistStore(store);
