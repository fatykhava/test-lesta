'use client';

import { FC, Fragment, useEffect, useRef } from 'react';
import { flexRender } from '@tanstack/react-table';

import Pagination from './TablePagination/TablePagination';
import { StorageKeys } from './config';
import NoResult from './NoResults';
import IProps from './types';

import styles from './styles.module.scss';

const Table: FC<IProps> = ({
  idTable,
  table,
  loadingData,
  className = '',
  isNavigation = true,
  filterTabs,
  isPin = true,
  columnFilters,
  sorting
}) => {
  const currentPage = table.getState().pagination.pageIndex;
  const tableRef = useRef<null | HTMLDivElement>(null);

  const isPage = table.getPageCount() !== 0;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        scrollTo();
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  useEffect(() => {
    if (typeof window !== 'undefined' && (columnFilters || sorting)) {
      const timer = setTimeout(() => {
        scrollTo();
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [columnFilters, sorting]);

  useEffect(() => {
    saveColumnSizing(idTable, table.getState().columnSizing);
  }, [table.getState().columnSizing]);

  return (
    <div className={`${className} ${styles.tableWrapper}`} ref={tableRef}>
      {filterTabs}
      <table className={styles.table} style={{ width: table.getCenterTotalSize() }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Fragment key={headerGroup.id}>
              <tr>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={`${styles.th} ${
                        index === 0 || index === 1 ? `${isPin ? styles.stickyCol : ''}` : ''
                      }`}
                      style={{ width: header.getSize() }}
                      id={header.id}
                    >
                      <div className={styles.head}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </Fragment>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={`${row.id}-${row.original.id}`}>
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    className={`${
                      index === 0 || index === 1 ? `${isPin ? styles.stickyCol : ''}` : ''
                    }`}
                    style={{ width: cell.column.getSize() }}
                  >
                    <div className={styles.padding}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {table.getRowModel().rows.length === 0 && !loadingData && <NoResult text="No data" />}

      {isPage && !loadingData && (
        <Pagination id={idTable} table={table} isNavigation={isNavigation} />
      )}
    </div>
  );

  /**
   * Scrolls the table to the top-left corner with a smooth animation.
   *
   * @return {void}
   */
  function scrollTo() {
    if (tableRef?.current) {
      tableRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }

  /**
   * Saves the column sizing information for a given table to local storage.
   *
   * @param {string} idTable - The ID of the table.
   * @param {Record<string, number>} columns - The column sizing information.
   * @return {void} This function does not return anything.
   */
  function saveColumnSizing(idTable: string, columns: Record<string, number>) {
    const tableSizing = JSON.parse(localStorage.getItem(StorageKeys.TABLE_SIZING) || '{}');
    localStorage.setItem(
      StorageKeys.TABLE_SIZING,
      JSON.stringify({
        ...tableSizing,
        [idTable]: columns
      })
    );
  }
};

export default Table;
