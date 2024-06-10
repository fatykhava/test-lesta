/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import TablePaginationUI from '@mui/material/TablePagination';

// import omit from 'lodash/omit';
// import { useRouter } from 'next/navigation';
import { StorageKeys } from '../config';

import { IMeta, IProps } from './types';

import styles from './styles.module.scss';

const rowsPerPageOptions = [5, 10, 15, 20];

const TablePagination: FC<IProps> = ({ id, table, isNavigation }) => {
  // const router = useRouter();

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
          labelRowsPerPage="Rows per page"
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
      // router.push({ query: { ...router?.query, page: page } });
    }
    table.setPageIndex(page - 1);
  }

  function setPageSizeHandler(page: number) {
    if (isNavigation) {
      // router.push({ query: { ...omit(router?.query, ['filters', 'page']) } });
    }
    table.setPageSize(page);
    const tablePageSize = JSON.parse(localStorage.getItem(StorageKeys.TABLE_PAGE_SIZE) || '{}');
    localStorage.setItem(
      StorageKeys.TABLE_PAGE_SIZE,
      JSON.stringify({ ...tablePageSize, [id]: page })
    );
  }
};

export default TablePagination;
