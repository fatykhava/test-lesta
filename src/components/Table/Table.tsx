'use client';

import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { useColumns } from './config';
import testdata from './testdata';

const Table = () => {
  const columns = useColumns();
  const table = useReactTable({
    columns,
    data: testdata,
    getCoreRowModel: getCoreRowModel()
  });

  console.log({ table });

  return <div>Table</div>;
};

export default Table;
