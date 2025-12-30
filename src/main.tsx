import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router/dom';
import router from './routes/router.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <Toaster position="top-right" richColors />
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  </StrictMode>
);
