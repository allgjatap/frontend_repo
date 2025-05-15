import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/services/QueryClient.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Loader } from '@/components/UI/Loader.tsx';
import { PrivateRoute, PublicRoute } from './navigator/router.helper.tsx';
import { MainLayout } from './layouts/MainLayout.tsx';
import { protectedRoutes } from './navigator/protected.routes.ts';
import { AuthLayout } from './layouts/AuthLayout.tsx';
import { publicRoutes } from './navigator/public.routes.ts';
import { meLoader } from './services/Auth/index.ts';
import { Onboarding } from './pages/Onboarding/Onboarding.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '',
        Component: PrivateRoute,
        children: [
          {
            path: '',
            loader: meLoader,
            Component: MainLayout,
            children: protectedRoutes,
          },
          {
            path: 'onboarding',
            Component: Onboarding,
          },
        ],
      },
      {
        path: '/',
        Component: PublicRoute,
        children: [
          {
            path: '/',
            Component: AuthLayout,
            children: publicRoutes,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} fallbackElement={<Loader />} />
      <ReactQueryDevtools position='bottom' initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
