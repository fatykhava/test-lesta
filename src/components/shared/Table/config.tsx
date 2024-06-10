/* eslint-disable react-hooks/rules-of-hooks */
import { Dispatch, SetStateAction, useMemo } from 'react';
import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import Image from 'next/image';

import { IVehicles } from '@/types';
import convertIntegerToRoman from '@/utils/convertIntegerToRoman';

import HeaderFilter from './HeaderFilter';

import styles from './styles.module.scss';

export const getTableConfig = () => ({
  pageSize: 10,
  initialSorting: {
    desc: true,
    id: 'id'
  },
  columnSizing: {
    'Название техники': 220,
    'I-X': 60,
    Страна: 100,
    Тип: 115,
    Прочность: 100,
    'Масса, кг': 115,
    'Max скорость, км': 175,
    'Средний урон': 135,
    'Разброс на 100м': 150,
    'Время сведения': 150
  },
  idTable: 'tanks'
});

export const useColumns = () => {
  return (
    setTableColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>,
    tableColumnFilters: ColumnFiltersState
  ) => {
    console.log({ setTableColumnFilters, tableColumnFilters });
    return useMemo<ColumnDef<IVehicles>[]>(
      () => [
        {
          id: 'Название техники',
          label: 'Название техники',
          accessorFn: (row) => (
            <div className={styles.name}>
              <Image src={row.images.contour_icon} alt={row.name || '—'} width={40} height={20} />
              {row.name || '—'}
            </div>
          ),
          cell: (cell) => cell.getValue(),
          header: () => <HeaderFilter text="Название техники" />
        },
        {
          id: 'I-X',
          label: 'Уровень техники',
          accessorFn: (row) => convertIntegerToRoman(row.tier) || '—',
          cell: (cell) => cell.getValue()
        },
        {
          id: 'Страна',
          label: 'Страна',
          accessorFn: (row) => row.nation.toUpperCase() || '—',
          cell: (cell) => cell.getValue()
        },
        {
          id: 'Тип',
          label: 'Тип',
          accessorFn: (row) => row.type || '—',
          cell: (cell) => cell.getValue()
        },
        {
          id: 'Прочность',
          label: 'Прочность',
          accessorFn: (row) => row.default_profile.hp || '—',
          cell: (cell) => cell.getValue()
        },
        {
          id: 'Масса, кг',
          label: 'Масса, кг',
          accessorFn: (row) => row.default_profile.weight || '—',
          cell: (cell) => cell.getValue()
        },
        {
          id: 'Max скорость, км',
          label: 'Max скорость, км',
          accessorFn: (row) => row.default_profile.speed_forward || '—',
          cell: (cell) => cell.getValue()
        },
        {
          id: 'Средний урон',
          label: 'Средний урон',
          accessorFn: (row) => row.default_profile.ammo[0].damage[1] || '—',
          cell: (cell) => cell.getValue()
        },
        {
          id: 'Разброс на 100м',
          label: 'Разброс на 100м',
          accessorFn: (row) => row.default_profile.gun.dispersion || '—',
          cell: (cell) => cell.getValue()
        },
        {
          id: 'Время сведения',
          label: 'Время сведения',
          accessorFn: (row) => row.default_profile.gun.aim_time || '—',
          cell: (cell) => cell.getValue()
        }
      ],
      []
    );
  };
};

export const StorageKeys = {
  TABLE_SETTINGS: 'TABLE_SETTINGS',
  TABLE_ORDER: 'TABLE_ORDER',
  TABLE_SIZING: 'TABLE_SIZING',
  TABLE_PAGE_SIZE: 'TABLE_PAGE_SIZE'
};
