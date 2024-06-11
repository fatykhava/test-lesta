/* eslint-disable react-hooks/rules-of-hooks */
import { Dispatch, SetStateAction, useMemo } from 'react';
import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import Image from 'next/image';

import { IVehicles } from '@/types';
import convertIntegerToRoman from '@/utils/convertIntegerToRoman';

import HeaderFilter from './HeaderFilter';
import { getPageSize } from './hooks';
import setColumnFiltersHandler from './utils';

import styles from './styles.module.scss';

export const getTableConfig = () => ({
  pageSize: getPageSize('tanks', 10),
  initialSorting: {
    desc: true,
    id: 'id'
  },
  columnSizing: {
    name: 220,
    tier: 60,
    nation: 100,
    type: 115,
    hp: 100,
    weight: 115,
    speed_forward: 175,
    damage_avr: 135,
    dispersion: 150,
    aim_time: 150
  },
  idTable: 'tanks'
});

export const useColumns = () => {
  return (
    setTableColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>,
    tableColumnFilters: ColumnFiltersState
  ) => {
    return useMemo<ColumnDef<IVehicles>[]>(
      () => [
        {
          id: 'name',
          accessorFn: (row) => (
            <div className={styles.name}>
              <Image
                //!!! in real life I'll ask the backend dev to change image url
                src={row.images.contour_icon.replace('http://', 'https://')}
                alt={row.name || '—'}
                width={40}
                height={20}
              />
              {row.name || '—'}
            </div>
          ),
          cell: (cell) => cell.getValue(),
          header: () => (
            <HeaderFilter
              id="name"
              title="Название техники"
              tableColumnFilters={tableColumnFilters}
              setColumnFilters={(newFilter) =>
                setColumnFiltersHandler(newFilter, setTableColumnFilters)
              }
            />
          )
        },
        {
          id: 'tier',
          header: 'I-X',
          accessorFn: (row) => convertIntegerToRoman(row.tier) || '—',
          cell: (cell) => cell.getValue()
        },
        {
          id: 'nation',
          header: 'Страна',
          accessorFn: (row) => row.nation.toUpperCase() || '—',
          cell: (cell) => cell.getValue()
        },
        {
          id: 'type',
          header: 'Тип',
          accessorFn: (row) => row.type || '—',
          cell: (cell) => cell.getValue()
        },
        {
          id: 'hp',
          header: 'Прочность',
          accessorFn: (row) => row.default_profile.hp || '—',
          cell: (cell) => cell.getValue()
        },
        {
          id: 'weight',
          header: 'Масса, кг',
          accessorFn: (row) => row.default_profile.weight || '—',
          cell: (cell) => cell.getValue()
        },
        {
          id: 'speed_forward',
          header: 'Max скорость, км',
          accessorFn: (row) => row.default_profile.speed_forward || '—',
          cell: (cell) => cell.getValue()
        },
        {
          id: 'damage_avr',
          header: 'Средний урон',
          accessorFn: (row) => row.default_profile.ammo[0].damage[1] || '—',
          cell: (cell) => cell.getValue()
        },
        {
          id: 'dispersion',
          header: 'Разброс на 100м',
          accessorFn: (row) => row.default_profile.gun.dispersion || '—',
          cell: (cell) => cell.getValue()
        },
        {
          id: 'aim_time',
          header: 'Время сведения',
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
