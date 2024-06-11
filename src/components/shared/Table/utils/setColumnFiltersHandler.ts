import { SetStateAction } from 'react';
import { ColumnFilter, ColumnFiltersState } from '@tanstack/react-table';

/**
 * Updates the state of `tableColumnFilters` based on the provided `newFilter`.
 *
 * @param {ColumnFilter} newFilter - The new filter to be added or removed.
 * @param {Function} setTableColumnFilters - The state setter function for `tableColumnFilters`.
 * @return {void} This function does not return anything.
 */

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
