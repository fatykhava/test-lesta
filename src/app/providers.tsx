'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Creates a new instance of the QueryClient class with default options.
 *
 * @return {QueryClient} A new instance of the QueryClient class.
 */

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000
      }
    }
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

/**
 * Returns a QueryClient instance based on the environment. If running in a browser,
 * it returns the existing browserQueryClient if it exists, otherwise it creates a new
 * QueryClient instance and assigns it to browserQueryClient. If running in a non-browser
 * environment, it creates a new QueryClient instance.
 *
 * @return {QueryClient} The QueryClient instance to be used.
 */

function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

/**
 * Renders the QueryProviders component which wraps the children with a QueryClientProvider
 * and provides a QueryClient instance.
 *
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.children - The children to be wrapped by the QueryClientProvider.
 * @return {JSX.Element} The rendered QueryClientProvider component.
 */

export default function QueryProviders({ children }: { children: JSX.Element }) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
