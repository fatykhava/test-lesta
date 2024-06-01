'use client';

import { toast } from 'react-toastify';
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
  toast.success('message');

  return <div>Table</div>;
};

export default Table;
