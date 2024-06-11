import { ColumnFilter, ColumnFiltersState } from '@tanstack/react-table';

export default interface IProps {
  setColumnFilters: (newFilter: ColumnFilter) => void;
  title: string;
  tableColumnFilters: ColumnFiltersState;
  id: string;
}
