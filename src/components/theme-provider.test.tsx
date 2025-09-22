import { render } from '@testing-library/react';
import { ThemeProvider } from './theme-provider';

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children, enableSystem, attribute, defaultTheme }: { children: React.ReactNode; enableSystem?: boolean; attribute?: string; defaultTheme?: string }) => (
    <div
      data-testid="next-themes-provider"
      data-enable-system={enableSystem}
      data-attribute={attribute}
      data-default-theme={defaultTheme}
    >
      {children}
    </div>
  ),
}));

describe('ThemeProvider', () => {
  it('renders children within NextThemesProvider', () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <div>Test Child Component</div>
      </ThemeProvider>
    );

    const provider = getByTestId('next-themes-provider');
    expect(provider).toBeInTheDocument();
    expect(getByText('Test Child Component')).toBeInTheDocument();
  });

  it('passes props to NextThemesProvider', () => {
    const { getByTestId } = render(
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div>Test Child</div>
      </ThemeProvider>
    );

    const provider = getByTestId('next-themes-provider');
    expect(provider).toHaveAttribute('data-attribute', 'class');
    expect(provider).toHaveAttribute('data-default-theme', 'dark');
    expect(provider).toHaveAttribute('data-enable-system', 'true');
  });

  it('renders multiple children correctly', () => {
    const { getByText } = render(
      <ThemeProvider>
        <div>Child 1</div>
        <div>Child 2</div>
        <span>Child 3</span>
      </ThemeProvider>
    );

    expect(getByText('Child 1')).toBeInTheDocument();
    expect(getByText('Child 2')).toBeInTheDocument();
    expect(getByText('Child 3')).toBeInTheDocument();
  });

  it('works without any props', () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <div>Default Provider</div>
      </ThemeProvider>
    );

    expect(getByTestId('next-themes-provider')).toBeInTheDocument();
    expect(getByText('Default Provider')).toBeInTheDocument();
  });
});