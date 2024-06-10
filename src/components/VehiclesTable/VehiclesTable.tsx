'use client';

import { useVehicles } from '@/features/vehicles';
import { IVehicles } from '@/types/vehicles';

import Loader from '../shared/Loader';
import { getTableConfig, useColumns } from '../shared/Table/config';
import { useTable, useUpdateTable } from '../shared/Table/hooks';
import Table from '../shared/Table/Table';

const VehiclesTable = () => {
  const columns = useColumns();
  const tableConfig = getTableConfig();
  const { setTotalCount, setRows, pagination, table, idTable } = useTable<IVehicles>(
    columns,
    tableConfig,
    false
  );

  const { data, isPending, isFetching, error, isError } = useVehicles(
    pagination.pageIndex + 1,
    pagination.pageSize
  );

  const { loading } = useUpdateTable<IVehicles>({
    items: data?.data || [],
    totalItems: data?.meta?.total,
    setTotalCount: setTotalCount,
    error: error,
    setRows: setRows
  });

  return (
    <div>
      {(isPending || isFetching || loading) && <Loader />}
      {isError && <div>Error</div>}
      <Table table={table} loadingData={isPending} idTable={idTable} isNavigation={false} isPin />
    </div>
  );
};

export default VehiclesTable;
