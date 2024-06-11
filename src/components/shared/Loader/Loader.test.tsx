import { render, screen } from '@testing-library/react';

import Loader from './Loader';

describe('Loader', () => {
  it('renders the loader component', () => {
    render(<Loader />);

    // Assert that the loader image is present
    const loaderImage = screen.getByRole('img', { name: 'loader' });
    expect(loaderImage).toBeInTheDocument();

    // Assert that the loader image has the correct width and height
    expect(loaderImage).toHaveAttribute('width', '50');
    expect(loaderImage).toHaveAttribute('height', '50');

    // Assert that the loader component has the correct class name
    const loaderContainer = screen.getByTestId('loader-container');
    expect(loaderContainer).toHaveClass('loader');
  });
});
