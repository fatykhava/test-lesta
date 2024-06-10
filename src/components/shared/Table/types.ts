/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnFiltersState, SortingState, Table } from '@tanstack/react-table';

interface IProps {
  idTable: string;
  table: Table<any>;
  loadingData: boolean;
  className?: string;
  isNavigation?: boolean;
  filterTabs?: JSX.Element;
  isPin?: boolean;
  columnFilters?: ColumnFiltersState;
  sorting?: SortingState;
  settingsState?: {
    resize: boolean;
    reorder: boolean;
  };
}

export default IProps;
