import { fireEvent, render, screen } from '@testing-library/react';
import SpotlightCard from './spotlight-card';

describe('SpotlightCard', () => {
  it('renders children', () => {
    render(<SpotlightCard>content</SpotlightCard>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('merges custom className with base styles', () => {
    render(<SpotlightCard className="custom-class">card</SpotlightCard>);
    const node = screen.getByText('card');
    expect(node).toHaveClass('spotlight', 'group', 'relative', 'custom-class');
  });

  it('updates --mx/--my CSS variables on mouse move', () => {
    render(<SpotlightCard data-testid="card">card</SpotlightCard>);
    const node = screen.getByTestId('card');

    jest
      .spyOn(node, 'getBoundingClientRect')
      .mockReturnValue({ left: 10, top: 20, width: 100, height: 50, right: 110, bottom: 70, x: 10, y: 20, toJSON: () => ({}) });

    fireEvent.mouseMove(node, { clientX: 60, clientY: 80 });

    expect(node.style.getPropertyValue('--mx')).toBe('50px');
    expect(node.style.getPropertyValue('--my')).toBe('60px');
  });
});
