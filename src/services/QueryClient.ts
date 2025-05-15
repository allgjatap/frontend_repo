import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const formatErrorMessage = (message: string | string[]) => {
  if (Array.isArray(message)) return message;
  return [message];
};

const handleError = (error: any) => {
  const messages = formatErrorMessage(error.response?.data.message);
  for (const message of messages) {
    toast.error(message);
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
      refetchInterval: false,
      staleTime: 1000 * 60 * 60, // 1 hour
      gcTime: 1000 * 60 * 60, // 1 hour
      throwOnError: (error: any) => {
        if (error.statusCode >= 500 || error.statusCode === 404) {
          return error;
        }

        handleError(error);
      },
    },
    mutations: {
      onError: handleError,
    },
  },
});

export default queryClient;