import { FC, memo } from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import TablePaginationUI from '@mui/material/TablePagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { StorageKeys } from '../config';

import { IMeta, IProps } from './types';

import styles from './styles.module.scss';

const rowsPerPageOptions = [10, 15, 20, 25];

const TablePagination: FC<IProps> = ({ id, table, isNavigation }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const pageCount = table.getPageCount();

  const totalCount = (table.options?.meta as IMeta)?.totalCount || 0;

  const ActionComponentDisabled = () => <span />;

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <TablePaginationUI
          component="div"
          count={totalCount}
          page={table.getState().pagination.pageIndex}
          showFirstButton
          rowsPerPage={table.getState().pagination.pageSize}
          rowsPerPageOptions={rowsPerPageOptions}
          onPageChange={() => {}}
          onRowsPerPageChange={(event) => setPageSizeHandler(Number(event.target.value))}
          ActionsComponent={ActionComponentDisabled}
          labelRowsPerPage="Кол-во строк"
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count}`}
          classes={{
            selectLabel: styles.selectLabel,
            select: styles.select,
            displayedRows: styles.displayedRows
          }}
        />
        <Pagination
          count={pageCount}
          page={table.getState().pagination.pageIndex + 1}
          onChange={(_, page) => setPageHandler(page)}
          variant="outlined"
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              classes={{
                selected: styles.selected,
                root: styles.pagination,
                ellipsis: styles.ellipsis,
                firstLast: styles.arrow,
                previousNext: styles.arrow
              }}
            />
          )}
        />
      </div>
    </div>
  );

  function setPageHandler(page: number) {
    if (isNavigation) {
      const params = new URLSearchParams(searchParams);
      params.set('page', String(page));
      replace(`${pathname}?${params.toString()}`);
    }
    table.setPageIndex(page - 1);
  }

  function setPageSizeHandler(size: number) {
    if (isNavigation) {
      const params = new URLSearchParams(searchParams);
      params.delete('page');
      replace(`${pathname}?${params.toString()}`);
    }
    table.setPageSize(size);
    const tablePageSize = JSON.parse(localStorage.getItem(StorageKeys.TABLE_PAGE_SIZE) || '{}');
    localStorage.setItem(
      StorageKeys.TABLE_PAGE_SIZE,
      JSON.stringify({ ...tablePageSize, [id]: size })
    );
  }
};

export default memo(TablePagination);
