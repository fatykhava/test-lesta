import { render, screen } from '@testing-library/react';

import Table from '@/components/Table';

describe('should render properly', () => {
  it('should contain the table', () => {
    render(<Table />);
    const ele = screen.getByRole('table', {
      name: /Unit testing/i
    });
    expect(ele).toBeInTheDocument();
  });
});
