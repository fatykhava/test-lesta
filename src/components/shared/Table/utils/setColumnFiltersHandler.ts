import { SetStateAction } from 'react';
import { ColumnFilter, ColumnFiltersState } from '@tanstack/react-table';

function setColumnFiltersHandler(
  newFilter: ColumnFilter,
  setTableColumnFilters: (value: SetStateAction<ColumnFiltersState>) => void
) {
  if (newFilter.value === '') {
    setTableColumnFilters((prevState) => prevState.filter((item) => item.id !== newFilter.id));
  } else {
    setTableColumnFilters((prevState) =>
      [newFilter, ...prevState].filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
    );
  }
}

export default setColumnFiltersHandler;
