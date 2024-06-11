import { render, screen } from '@testing-library/react';

import NoResults from './NoResults';

describe('NoResults', () => {
  it('renders the component with the default text', () => {
    render(<NoResults />);

    const noResultsText = screen.getByText('No Results');
    expect(noResultsText).toBeInTheDocument();
    expect(noResultsText).toHaveClass('text');
  });

  it('renders the component with custom text', () => {
    render(<NoResults text="No data available" />);

    const noResultsText = screen.getByText('No data available');
    expect(noResultsText).toBeInTheDocument();
    expect(noResultsText).toHaveClass('text');
  });
});
