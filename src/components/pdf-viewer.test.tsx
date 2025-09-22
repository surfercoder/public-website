import { render, screen, fireEvent } from '@testing-library/react';
import PdfViewer from './pdf-viewer';

// Mock react-pdf
jest.mock('react-pdf', () => ({
  Document: ({ children, onLoadSuccess, file }: { children: React.ReactNode; onLoadSuccess: (data: { numPages: number }) => void; file: string }) => (
    <div data-testid="pdf-document" data-file={file}>
      <button
        data-testid="load-success-trigger"
        onClick={() => onLoadSuccess({ numPages: 2 })}
      >
        Load Success
      </button>
      {children}
    </div>
  ),
  Page: ({ pageNumber, width }: { pageNumber: number; width: number }) => (
    <div data-testid={`pdf-page-${pageNumber}`} data-width={width}>
      Page {pageNumber}
    </div>
  ),
  pdfjs: {
    GlobalWorkerOptions: {},
  },
}));

// Mock window.innerWidth
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

describe('PdfViewer', () => {
  beforeEach(() => {
    // Reset window.innerWidth before each test
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('renders pdf document with correct file path', () => {
    render(<PdfViewer />);

    const document = screen.getByTestId('pdf-document');
    expect(document).toBeInTheDocument();
    expect(document).toHaveAttribute('data-file', '/AgustinCassaniCV.pdf');
  });

  it('renders pages after successful load', () => {
    render(<PdfViewer />);

    const loadButton = screen.getByTestId('load-success-trigger');
    fireEvent.click(loadButton);

    expect(screen.getByTestId('pdf-page-1')).toBeInTheDocument();
    expect(screen.getByTestId('pdf-page-2')).toBeInTheDocument();
  });

  it('sets correct page width for desktop', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      writable: true,
    });

    render(<PdfViewer />);

    const loadButton = screen.getByTestId('load-success-trigger');
    fireEvent.click(loadButton);

    const page1 = screen.getByTestId('pdf-page-1');
    expect(page1).toHaveAttribute('data-width', '600');
  });

  it('sets correct page width for mobile', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 400,
      writable: true,
    });

    render(<PdfViewer />);

    const loadButton = screen.getByTestId('load-success-trigger');
    fireEvent.click(loadButton);

    const page1 = screen.getByTestId('pdf-page-1');
    expect(page1).toHaveAttribute('data-width', '370'); // 400 - 30
  });

  it('renders correct number of pages', () => {
    render(<PdfViewer />);

    // Initially no pages
    expect(screen.queryByTestId('pdf-page-1')).not.toBeInTheDocument();

    // After load success with 2 pages
    const loadButton = screen.getByTestId('load-success-trigger');
    fireEvent.click(loadButton);

    expect(screen.getByTestId('pdf-page-1')).toBeInTheDocument();
    expect(screen.getByTestId('pdf-page-2')).toBeInTheDocument();
    expect(screen.queryByTestId('pdf-page-3')).not.toBeInTheDocument();
  });

  it('has correct container class', () => {
    const { container } = render(<PdfViewer />);

    const pdfContainer = container.querySelector('.pdf-container');
    expect(pdfContainer).toBeInTheDocument();
  });

  it('generates unique keys for pages', () => {
    render(<PdfViewer />);

    const loadButton = screen.getByTestId('load-success-trigger');
    fireEvent.click(loadButton);

    const page1 = screen.getByTestId('pdf-page-1');
    const page2 = screen.getByTestId('pdf-page-2');

    expect(page1).toBeInTheDocument();
    expect(page2).toBeInTheDocument();
  });

  it('handles edge case for small screens', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 320,
      writable: true,
    });

    render(<PdfViewer />);

    const loadButton = screen.getByTestId('load-success-trigger');
    fireEvent.click(loadButton);

    const page1 = screen.getByTestId('pdf-page-1');
    expect(page1).toHaveAttribute('data-width', '290'); // 320 - 30
  });
});