import setColumnFiltersHandler from './setColumnFiltersHandler';

describe('setColumnFiltersHandler', () => {
  const mockSetTableColumnFilters = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('removes the filter when the value is empty', () => {
    const newFilter = { id: 'test', value: '' };
    const prevState = [
      { id: 'test', value: 'foo' },
      { id: 'another', value: 'bar' }
    ];

    setColumnFiltersHandler(newFilter, mockSetTableColumnFilters);

    expect(mockSetTableColumnFilters).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetTableColumnFilters.mock.calls[0][0](prevState)).toEqual([
      { id: 'another', value: 'bar' }
    ]);
  });

  it('adds a new filter and removes duplicates', () => {
    const newFilter = { id: 'test', value: 'foo' };
    const prevState = [
      { id: 'test', value: 'bar' },
      { id: 'another', value: 'baz' }
    ];

    setColumnFiltersHandler(newFilter, mockSetTableColumnFilters);

    expect(mockSetTableColumnFilters).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetTableColumnFilters.mock.calls[0][0](prevState)).toEqual([
      { id: 'test', value: 'foo' },
      { id: 'another', value: 'baz' }
    ]);
  });

  it('updates an existing filter', () => {
    const newFilter = { id: 'test', value: 'foo' };
    const prevState = [
      { id: 'test', value: 'bar' },
      { id: 'another', value: 'baz' }
    ];

    setColumnFiltersHandler(newFilter, mockSetTableColumnFilters);

    expect(mockSetTableColumnFilters).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetTableColumnFilters.mock.calls[0][0](prevState)).toEqual([
      { id: 'test', value: 'foo' },
      { id: 'another', value: 'baz' }
    ]);
  });
});
