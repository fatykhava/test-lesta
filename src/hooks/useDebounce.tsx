import { useEffect, useState } from 'react';

/**
 * Returns a debounced value of the input value. The debounced value is updated after a specified delay.
 *
 * @param {T} value - The input value to debounce.
 * @param {number} [delay=500] - The delay in milliseconds before updating the debounced value. Defaults to 500ms.
 * @return {T} The debounced value.
 */

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
