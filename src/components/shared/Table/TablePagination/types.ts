/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from '@tanstack/react-table';

export interface IMeta {
  totalCount?: number;
}

export interface IProps {
  id: string;
  table: Table<any>;
  isNavigation: boolean;
}
