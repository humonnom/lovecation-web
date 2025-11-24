'use client';

import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { handleQueryError } from '@/lib/errorHandler';

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: (failureCount, error) => {
              // Don't retry on 404s or auth errors
              if ((error as any)?.status === 404 || (error as any)?.status === 401) {
                return false;
              }
              return failureCount < 2;
            },
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: 'always', // Refetch when network reconnects
          },
          mutations: {
            retry: 1,
          },
        },
        // React Query v5: 전역 에러 핸들러는 QueryCache와 MutationCache 사용
        queryCache: new QueryCache({
          onError: handleQueryError,
        }),
        mutationCache: new MutationCache({
          onError: handleQueryError,
        }),
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
