import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getVehicles } from '@/services/api';

export const VEHICLES_QUERY_CONFIG = {
  key: 'vehicles',
  fn: (page: number, limit: number) => getVehicles(page, limit)
};

export const useVehicles = (page: number, limit: number) => {
  return useQuery({
    queryKey: [VEHICLES_QUERY_CONFIG.key, page, limit],
    queryFn: () => VEHICLES_QUERY_CONFIG.fn(page, limit),
    placeholderData: keepPreviousData,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity
  });
};
