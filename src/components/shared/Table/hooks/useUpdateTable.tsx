import { Dispatch, SetStateAction, useEffect, useState } from 'react';

/**
 * Custom React hook that updates the table state with the provided data.
 *
 * @template T - The type of items in the table.
 * @param {Object} props - The properties for the hook.
 * @param {T[] | undefined} props.items - The items to update the table with.
 * @param {number | undefined} props.totalItems - The total number of items in the table.
 * @param {Dispatch<SetStateAction<number>>} props.setTotalCount - The state setter for the total number of items.
 * @param {Error | null} props.error - The error that occurred while fetching the items.
 * @param {Dispatch<SetStateAction<T[]>>} props.setRows - The state setter for the rows in the table.
 * @returns {Object} - An object containing the loading state and a setter for the loading state.
 */

export function useUpdateTable<T>({
  items,
  totalItems,
  setTotalCount,
  error,
  setRows
}: {
  items: T[] | undefined;
  totalItems: number | undefined;
  setTotalCount: Dispatch<SetStateAction<number>>;
  error: Error | null;
  setRows: Dispatch<SetStateAction<T[]>>;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && !error && items !== undefined && totalItems !== undefined) {
      setTotalCount(totalItems);
      setRows(items);
    }
    if (!loading && items?.length === 0) {
      setTotalCount(totalItems || 0);
      setRows([]);
    }
  }, [items, totalItems]);

  return {
    loading,
    setLoading
  };
}
