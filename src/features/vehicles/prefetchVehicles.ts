import { dehydrate, QueryClient } from '@tanstack/react-query';

import { VEHICLES_QUERY_CONFIG } from './useVehicles';

export const prefetchVehicles = async (page: number) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [VEHICLES_QUERY_CONFIG.key, page],
    queryFn: () => VEHICLES_QUERY_CONFIG.fn(page, 10),
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};
