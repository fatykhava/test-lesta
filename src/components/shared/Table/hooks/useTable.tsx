'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  ColumnFiltersState,
  ColumnSizingState,
  ColumnSort,
  ExpandedState,
  getExpandedRowModel,
  PaginationState,
  Row,
  SortingState
} from '@tanstack/react-table';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
// import omit from 'lodash/omit';
import { useSearchParams } from 'next/navigation';

import { useDebounce } from '@/hooks';

import { StorageKeys } from '../config';

export function useTable<T>(
  getColumns: (
    setTableColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>,
    tableColumnFilters: ColumnFiltersState
  ) => ColumnDef<T>[],
  {
    pageSize,
    initialSorting,
    columnSizing,
    idTable,
    enableRowSelection
  }: {
    pageSize: number;
    initialSorting: ColumnSort;
    columnSizing: ColumnSizingState;
    idTable: string;
    enableRowSelection?: boolean | ((row: Row<T>) => boolean) | undefined;
  },
  isNavigation = true,
  initFilter?: ColumnFiltersState
) {
  const searchParams = useSearchParams();
  // const router = useRouter();
  const page = isNavigation ? Number(searchParams.get('page') || 1) - 1 : 0;
  const filters = isNavigation
    ? getFiltes(searchParams.get('filters') as string)
    : initFilter || [];

  const [totalCount, setTotalCount] = useState<number>(0);
  const [settingsState, setSettingsState] = useState<{ resize: boolean; reorder: boolean }>({
    resize: true,
    reorder: false
  });
  const [rows, setRows] = useState<T[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page,
    pageSize: getPageSize(idTable, pageSize)
  });
  useEffect(() => {
    if (page !== pagination.pageIndex) {
      setPagination((oldValue) => {
        return {
          pageIndex: page,
          pageSize: oldValue.pageSize
        };
      });
    }
  }, [page]);

  const pages = Math.ceil(totalCount / pagination.pageSize);

  const handleSetTableColumnFilters = (value: SetStateAction<ColumnFiltersState>) => {
    setTableColumnFilters(value);
    setPagination((oldValue) => {
      return {
        pageIndex: 0,
        pageSize: oldValue.pageSize
      };
    });
  };

  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [sorting, setSorting] = useState<SortingState>([initialSorting]);
  const [tableColumnFilters, setTableColumnFilters] = useState<ColumnFiltersState>(filters);
  const debouncedColumnFilters = useDebounce(tableColumnFilters, 250);
  const columns = getColumns(handleSetTableColumnFilters, tableColumnFilters);

  useEffect(() => {
    if (filters !== tableColumnFilters && isNavigation) {
      // if (tableColumnFilters.length) {
      //   router.push('', {
      //     ...omit(searchParams, 'page')
      //     // filters: JSON.stringify(tableColumnFilters)
      //   });
      // } else {
      //   // router.push('', { ...(omit(searchParams.get, ['filters', 'page']) });
      // }
    }
  }, [tableColumnFilters, isNavigation]);

  const columnVisibility = getColumnVisibility(columns, idTable);
  const columnOrder = getColumnOrder(idTable);
  const savedColumnSizing = getColumnSizing(idTable, columnSizing);

  const table = useReactTable({
    data: rows,
    columns,
    columnResizeMode: 'onChange',
    initialState: { columnVisibility, columnSizing },
    state: {
      columnFilters: debouncedColumnFilters,
      sorting,
      pagination,
      rowSelection,
      expanded
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => (row as T & { items?: T[] }).items,
    ...(!!enableRowSelection && { enableRowSelection }),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: handleSetTableColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onPaginationChange: setPagination,
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    enableMultiRowSelection: true,
    pageCount: pages,
    meta: {
      totalCount: totalCount
    }
  });

  useEffect(() => {
    if (!isEmpty(savedColumnSizing)) {
      table.setColumnSizing(savedColumnSizing);
    }
    if (columnOrder.length) {
      table.setColumnOrder(columnOrder);
    }
  }, []);

  return {
    setTotalCount,
    setRows,
    pagination,
    setPagination,
    setRowSelection,
    rowSelection,
    sorting,
    debouncedColumnFilters,
    setTableColumnFilters: handleSetTableColumnFilters,
    table,
    idTable,
    settingsState,
    setSettingsState
  };
}

function getFiltes(filters: string) {
  try {
    return JSON.parse(String(filters || '[]'));
  } catch (error) {
    return [];
  }
}

function getColumnVisibility<T>(columns: ColumnDef<T, unknown>[], idTable: string) {
  const tableSettings = JSON.parse(localStorage.getItem(StorageKeys.TABLE_SETTINGS) || '{}');
  const columnSettings = tableSettings[idTable] ? tableSettings[idTable] : {};
  return columns.reduce((obj, column) => {
    const state = columnSettings[column.id || ''];
    return { ...obj, [column.id || '']: isUndefined(state) ? !column.enableHiding : state };
  }, {});
}

function getColumnOrder(idTable: string) {
  const tableOrder = JSON.parse(localStorage.getItem(StorageKeys.TABLE_ORDER) || '{}');
  const columnOrder = tableOrder[idTable] ? tableOrder[idTable] : [];
  return columnOrder;
}

function getColumnSizing(idTable: string, initColumnSizing: ColumnSizingState | undefined) {
  const tableSizing = JSON.parse(localStorage.getItem(StorageKeys.TABLE_SIZING) || '{}');
  const columnSizing = tableSizing[idTable] ? tableSizing[idTable] : initColumnSizing;
  return columnSizing;
}

function getPageSize(idTable: string, defaultPageSize: number) {
  const tablePageSize = JSON.parse(localStorage.getItem(StorageKeys.TABLE_PAGE_SIZE) || '{}');
  return tablePageSize[idTable] ? tablePageSize[idTable] : defaultPageSize;
}
