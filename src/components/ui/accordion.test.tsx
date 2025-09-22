import { render, screen } from '@testing-library/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion';

// Mock Radix UI Accordion
jest.mock('@radix-ui/react-accordion', () => {
  const MockTrigger = ({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: unknown }) => (
    <button data-testid="accordion-trigger" className={className} {...props}>{children}</button>
  );
  MockTrigger.displayName = 'AccordionTrigger';

  const MockContent = ({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: unknown }) => {
    const baseClasses = 'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down';
    const finalClasses = className ? `${baseClasses} ${className}` : baseClasses;

    return (
      <div data-testid="accordion-content" className={finalClasses} {...props}>
        <div className="pb-4 pt-0">{children}</div>
      </div>
    );
  };
  MockContent.displayName = 'AccordionContent';

  return {
    Root: ({ children, ...props }: { children: React.ReactNode; collapsible?: boolean; [key: string]: unknown }) => {
      const { collapsible, ...otherProps } = props;
      return <div data-testid="accordion-root" data-collapsible={collapsible} {...otherProps}>{children}</div>;
    },
    Item: ({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: unknown }) => (
      <div data-testid="accordion-item" className={className} {...props}>{children}</div>
    ),
    Header: ({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: unknown }) => (
      <div data-testid="accordion-header" className={className} {...props}>{children}</div>
    ),
    Trigger: MockTrigger,
    Content: MockContent,
  };
});

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ChevronDown: () => <div data-testid="chevron-down-icon" />,
}));

describe('Accordion Components', () => {
  describe('Accordion', () => {
    it('renders accordion root component', () => {
      render(
        <Accordion type="single" collapsible>
          <div>Accordion content</div>
        </Accordion>
      );

      const root = screen.getByTestId('accordion-root');
      expect(root).toBeInTheDocument();
      expect(root).toHaveAttribute('type', 'single');
      expect(root).toHaveAttribute('data-collapsible', 'true');
    });
  });

  describe('AccordionItem', () => {
    it('renders with default classes', () => {
      render(
        <AccordionItem value="item-1">
          <div>Item content</div>
        </AccordionItem>
      );

      const item = screen.getByTestId('accordion-item');
      expect(item).toBeInTheDocument();
      expect(item).toHaveClass('border-b');
      expect(item).toHaveAttribute('value', 'item-1');
    });

    it('applies custom className', () => {
      render(
        <AccordionItem value="item-1" className="custom-item">
          <div>Item content</div>
        </AccordionItem>
      );

      const item = screen.getByTestId('accordion-item');
      expect(item).toHaveClass('custom-item', 'border-b');
    });

    it('has correct display name', () => {
      expect(AccordionItem.displayName).toBe('AccordionItem');
    });
  });

  describe('AccordionTrigger', () => {
    it('renders with default classes and chevron icon', () => {
      render(
        <AccordionTrigger>
          <span>Trigger content</span>
        </AccordionTrigger>
      );

      const trigger = screen.getByTestId('accordion-trigger');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveClass(
        'flex',
        'flex-1',
        'items-center',
        'justify-between',
        'py-4',
        'font-medium',
        'transition-all',
        'hover:underline'
      );

      expect(screen.getByTestId('chevron-down-icon')).toBeInTheDocument();
      expect(screen.getByText('Trigger content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <AccordionTrigger className="custom-trigger">
          <span>Custom trigger</span>
        </AccordionTrigger>
      );

      const trigger = screen.getByTestId('accordion-trigger');
      expect(trigger).toHaveClass('custom-trigger');
    });

    it('renders within accordion header', () => {
      render(
        <AccordionTrigger>
          <span>Trigger content</span>
        </AccordionTrigger>
      );

      const header = screen.getByTestId('accordion-header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('flex');
    });

    it('has correct display name', () => {
      expect(AccordionTrigger.displayName).toBe('AccordionTrigger');
    });

    it('renders chevron with correct classes', () => {
      render(
        <AccordionTrigger>
          <span>Trigger content</span>
        </AccordionTrigger>
      );

      const trigger = screen.getByTestId('accordion-trigger');
      expect(trigger).toHaveClass('[&[data-state=open]>svg]:rotate-180');
    });
  });

  describe('AccordionContent', () => {
    it('renders with default classes', () => {
      render(
        <AccordionContent>
          <div>Content text</div>
        </AccordionContent>
      );

      const content = screen.getByTestId('accordion-content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass(
        'overflow-hidden',
        'text-sm',
        'transition-all',
        'data-[state=closed]:animate-accordion-up',
        'data-[state=open]:animate-accordion-down'
      );

      expect(screen.getByText('Content text')).toBeInTheDocument();
    });

    it('renders with content', () => {
      render(
        <AccordionContent>
          <div>Custom content</div>
        </AccordionContent>
      );

      const content = screen.getByTestId('accordion-content');
      expect(content).toBeInTheDocument();
      expect(screen.getByText('Custom content')).toBeInTheDocument();
    });

    it('has correct display name', () => {
      expect(AccordionContent.displayName).toBe('AccordionContent');
    });

    it('renders content wrapper with padding', () => {
      render(
        <AccordionContent>
          <div>Content text</div>
        </AccordionContent>
      );

      const wrapper = screen.getByText('Content text').parentElement;
      expect(wrapper).toHaveClass('pb-4', 'pt-0');
    });
  });

  describe('Full Accordion Structure', () => {
    it('renders complete accordion with all components', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Section 1</AccordionTrigger>
            <AccordionContent>
              <p>Content for section 1</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Section 2</AccordionTrigger>
            <AccordionContent>
              <p>Content for section 2</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByTestId('accordion-root')).toBeInTheDocument();
      expect(screen.getAllByTestId('accordion-item')).toHaveLength(2);
      expect(screen.getAllByTestId('accordion-trigger')).toHaveLength(2);
      expect(screen.getAllByTestId('accordion-content')).toHaveLength(2);

      expect(screen.getByText('Section 1')).toBeInTheDocument();
      expect(screen.getByText('Section 2')).toBeInTheDocument();
      expect(screen.getByText('Content for section 1')).toBeInTheDocument();
      expect(screen.getByText('Content for section 2')).toBeInTheDocument();
    });
  });
});