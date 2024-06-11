import { act, renderHook, waitFor } from '@testing-library/react';

import { useDebounce } from './useDebounce';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('useDebounce', () => {
  it('should debounce the value', async () => {
    const { result, rerender } = renderHook((props) => useDebounce(props.value, props.delay), {
      initialProps: { value: 'initial', delay: 500 }
    });

    expect(result.current).toEqual('initial');

    act(() => {
      rerender({ value: 'updated', delay: 500 });
    });

    expect(result.current).toEqual('initial');

    await waitFor(() => expect(result.current).toEqual('updated'));
  });

  it('should use the default delay if not provided', async () => {
    const { result, rerender } = renderHook((props) => useDebounce(props.value), {
      initialProps: { value: 'initial' }
    });

    expect(result.current).toEqual('initial');

    act(() => {
      rerender({ value: 'updated' });
    });

    expect(result.current).toEqual('initial');

    await waitFor(() => expect(result.current).toEqual('updated'));
  });

  it('should clean up the timer on unmount', async () => {
    const { unmount, rerender } = renderHook((props) => useDebounce(props.value, props.delay), {
      initialProps: { value: 'initial', delay: 500 }
    });

    act(() => {
      rerender({ value: 'updated', delay: 500 });
    });

    unmount();
    await waitFor(() => expect(setTimeout).not.toHaveBeenCalledTimes(2));
  });
});
