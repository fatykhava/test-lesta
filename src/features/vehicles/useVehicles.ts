import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getVehicles } from '@/services/api';

export const VEHICLES_QUERY_CONFIG = {
  key: 'vehicles',
  fn: (page: number, limit: number) => getVehicles(page, limit)
};

/**
 * Retrieves a list of vehicles using the provided page number and limit.
 *
 * @param {number} page - The page number to retrieve.
 * @param {number} limit - The maximum number of vehicles to retrieve per page.
 * @return {Promise<QueryObserverResult<IVehiclesList, unknown>>} A promise that resolves to the query result.
 */

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
