/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { ITestData } from './testdata';

export const getTableConfig = () => ({
  pageSize: 10,
  initialSorting: {
    desc: true,
    id: 'id'
  },
  //   columnSizing: {
  //     id: 50,
  //     updatedDate: 190,
  //     action: 185,
  //     newValue: 400
  //   },
  idTable: 'tanks'
});

export const useColumns = () => {
  return useMemo<ColumnDef<ITestData>[]>(
    () => [
      {
        id: 'firstName',
        label: 'First Name',
        accessorFn: (row) => row.firstName || '—',
        cell: (cell) => cell.getValue()
      }
    ],
    []
  );
};
