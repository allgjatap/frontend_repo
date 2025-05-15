import { NextUIProvider } from '@nextui-org/react';
import './App.css';
import { Toaster } from "sonner";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Suspense } from "react";
import { Loader } from "./components/UI/Loader";
import { Outlet, useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Toaster />

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset}>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </NextUIProvider>
  );
};

export default App;
