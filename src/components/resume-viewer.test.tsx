import { render, screen } from '@testing-library/react';

describe('ResumeViewer', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('renders pdf viewer component', async () => {
    // Mock next/dynamic before requiring the module under test
    const dynamic = jest.fn(() => function MockPdfViewer() { return <div data-testid="pdf-viewer" /> });
    jest.doMock('next/dynamic', () => dynamic);
    // Mock the lazily imported PdfViewer so the loader can resolve safely
    jest.doMock('@/components/pdf-viewer', () => ({ __esModule: true, default: () => null }));

    const { default: ResumeViewer } = await import('./resume-viewer');

    render(<ResumeViewer />);
    expect(screen.getByTestId('pdf-viewer')).toBeInTheDocument();

    // Ensure the dynamic config is correct
    expect(dynamic).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ ssr: false })
    );

    // Invoke the loader function passed to dynamic to cover it
    const calls = (dynamic as unknown as jest.Mock).mock?.calls ?? [];
    const firstCall = Array.isArray(calls) ? calls[0] : undefined;
    if (firstCall && firstCall[0]) {
      const loader = firstCall[0] as () => Promise<unknown> | unknown;
      await Promise.resolve(loader());
    }
  });

  it('executes dynamic import at module evaluation time (isolate modules)', async () => {
    const dynamicMock = jest.fn(() => function MockPdfViewer() { return null; });
    jest.doMock('next/dynamic', () => dynamicMock);
    // Mock the lazily imported PdfViewer
    jest.doMock('@/components/pdf-viewer', () => ({ __esModule: true, default: () => null }));

    let ResumeViewer: React.ComponentType | undefined;
    await jest.isolateModulesAsync(async () => {
      const mod = await import('./resume-viewer');
      expect(mod).toBeTruthy();
      ResumeViewer = mod.default;
    });

    // Render to trigger the dynamic() call inside the component
    if (!ResumeViewer) {
      throw new Error('ResumeViewer component not loaded');
    }
    render(<ResumeViewer />);

    expect(dynamicMock).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ ssr: false })
    );

    // Also cover the loader function
    const calls = (dynamicMock as unknown as jest.Mock).mock?.calls ?? [];
    const firstCall = Array.isArray(calls) ? calls[0] : undefined;
    if (firstCall && firstCall[0]) {
      const loader = firstCall[0] as () => Promise<unknown> | unknown;
      await Promise.resolve(loader());
    }
  });
});