import { HydrationBoundary } from '@tanstack/react-query';

import VehiclesTable from '@/components/VehiclesTable';
import { prefetchVehicles } from '@/features/vehicles';

export default function Home() {
  const dehydratedState = prefetchVehicles(1);

  return (
    <HydrationBoundary state={dehydratedState}>
      <VehiclesTable />
    </HydrationBoundary>
  );
}
