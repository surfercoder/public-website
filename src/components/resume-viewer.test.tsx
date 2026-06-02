import { render, screen } from '@testing-library/react';
import ResumeViewer from './resume-viewer';

describe('ResumeViewer', () => {
  it('renders an iframe pointing at the PDF', () => {
    render(<ResumeViewer />);
    const frame = screen.getByTitle('Agustin Cassani resume');
    expect(frame).toBeInTheDocument();
    expect(frame.tagName).toBe('IFRAME');
    expect(frame).toHaveAttribute('src', '/AgustinCassaniCV.pdf#view=FitH');
    expect(frame).toHaveAttribute('loading', 'lazy');
    expect(frame).toHaveAttribute('sandbox', 'allow-same-origin');
  });

  it('uses a responsive viewport-sized layout', () => {
    render(<ResumeViewer />);
    const frame = screen.getByTitle('Agustin Cassani resume');
    expect(frame).toHaveClass('w-full', 'h-[80vh]', 'min-h-[600px]', 'border-0');
  });
});
