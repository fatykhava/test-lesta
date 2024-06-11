import { fireEvent, render, screen } from '@testing-library/react';

import HeaderFilter from './HeaderFilter';

describe('HeaderFilter', () => {
  const mockProps = {
    title: 'Name',
    tableColumnFilters: [
      { id: 'name', value: 'John Doe' },
      { id: 'email', value: 'john@example.com' }
    ],
    setColumnFilters: jest.fn(),
    id: 'name'
  };

  it('renders the component with the correct initial value', () => {
    render(<HeaderFilter {...mockProps} />);

    const input = screen.getByPlaceholderText('Name');
    expect(input).toHaveValue('John Doe');
  });

  it('updates the column filters when the input value changes', () => {
    render(<HeaderFilter {...mockProps} />);

    const input = screen.getByPlaceholderText('Name');
    fireEvent.change(input, { target: { value: 'Jane Doe' } });

    expect(mockProps.setColumnFilters).toHaveBeenCalledWith({ id: 'name', value: 'Jane Doe' });
  });

  it('clears the input value when the close button is clicked', () => {
    render(<HeaderFilter {...mockProps} />);

    const input = screen.getByPlaceholderText('Name');
    const closeButton = screen.getByRole('button', { name: '×' });

    fireEvent.change(input, { target: { value: 'John Doe' } });
    fireEvent.click(closeButton);

    expect(input).toHaveValue('');
    expect(mockProps.setColumnFilters).toHaveBeenCalledWith({ id: 'name', value: '' });
  });
});
