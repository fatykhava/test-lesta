import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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
