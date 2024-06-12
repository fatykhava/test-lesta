'use client';

import { memo, useMemo } from 'react';

import { useVehicles } from '@/features/vehicles';
import { IVehicles } from '@/types/vehicles';
import normalizeString from '@/utils/normalizeString';

import Loader from '../shared/Loader';
import { getTableConfig, useColumns } from '../shared/Table/config';
import { useTable, useUpdateTable } from '../shared/Table/hooks';
import Table from '../shared/Table/Table';

const VehiclesTable = () => {
  const columns = useColumns();
  const tableConfig = getTableConfig();
  const { setTotalCount, setRows, pagination, table, idTable, debouncedColumnFilters } =
    useTable<IVehicles>(columns, tableConfig, true);

  const { data, isPending, isFetching, error, isError } = useVehicles(
    pagination.pageIndex + 1,
    pagination.pageSize
  );

  //!!! Cannot find the way to filter data on backend side - so I decided to filter data on client side for page data only
  const filteredData = useMemo(() => {
    const response = data?.data || [];
    const nameFilter = String(
      debouncedColumnFilters.find((item) => item.id === 'name')?.value || ''
    );

    if (nameFilter) {
      const normalizedFilter = normalizeString(nameFilter.toLowerCase());
      return response.filter((item) =>
        normalizeString(item.name || '')
          .toLocaleLowerCase()
          .includes(normalizedFilter)
      );
    } else {
      return response;
    }
  }, [data, debouncedColumnFilters]);

  const { loading } = useUpdateTable<IVehicles>({
    items: filteredData,
    totalItems: data?.meta?.total,
    setTotalCount: setTotalCount,
    error: error,
    setRows: setRows
  });

  return (
    <div>
      {(isPending || isFetching || loading) && <Loader />}
      {isError && <div>Error</div>}
      <Table table={table} loadingData={isPending} idTable={idTable} isNavigation isPin />
    </div>
  );
};

export default memo(VehiclesTable);
