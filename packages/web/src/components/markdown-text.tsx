import { cn } from '@/lib/utils';
import { ClassAttributes, ElementType, HTMLAttributes } from 'react';
import Markdown, { ExtraProps } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownTextProps {
  className?: string;
  children: string | null | undefined;
}

// Define reusable components for common Markdown elements
const H1: ElementType<ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement> & ExtraProps> = (props) => {
  return <h1 {...props} className='text-lg font-bold' />;
};

const H2: ElementType<ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement> & ExtraProps> = (props) => {
  return <h2 {...props} className='font-bold' />;
};

const Paragraph: ElementType<ClassAttributes<HTMLParagraphElement> & HTMLAttributes<HTMLParagraphElement> & ExtraProps> = (props) => {
  return <p {...props} className='' />;
};

const Blockquote: ElementType<ClassAttributes<HTMLQuoteElement> & HTMLAttributes<HTMLQuoteElement> & ExtraProps> = (props) => {
  return (
    <blockquote
      {...props}
      className='[&>*]:my-2 [&>*]:rounded-md [&>*]:bg-[#dadada] [&>*]:p-2 [&>*]:px-2 [&>*]:text-sm [&>*]:text-[#707070]'
    />
  );
};

const Code: ElementType<ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement> & ExtraProps> = (props) => {
  return <code {...props} className='' />;
};

const List: ElementType<ClassAttributes<HTMLUListElement> & HTMLAttributes<HTMLUListElement> & ExtraProps> = (props) => {
  return <ul {...props} className='' />;
};

const ListItem: ElementType<ClassAttributes<HTMLLIElement> & HTMLAttributes<HTMLLIElement> & ExtraProps> = (props) => {
  return <li {...props} className='' />;
};

const OrderedList: ElementType<ClassAttributes<HTMLOListElement> & HTMLAttributes<HTMLOListElement> & ExtraProps> = (props) => {
  return <ol {...props} className='' />;
};

const Table: ElementType<ClassAttributes<HTMLTableElement> & HTMLAttributes<HTMLTableElement> & ExtraProps> = (props) => {
  return <table {...props} className='border border-collapse border-input' />;
};

const TableRow: ElementType<ClassAttributes<HTMLTableRowElement> & HTMLAttributes<HTMLTableRowElement> & ExtraProps> = (props) => {
  return <tr {...props} className='' />;
};

const TableCell: ElementType<ClassAttributes<HTMLTableCellElement> & HTMLAttributes<HTMLTableCellElement> & ExtraProps> = (props) => {
  return <td {...props} className='px-2 border border-input' />;
};

const TableHeader: ElementType<ClassAttributes<HTMLTableCellElement> & HTMLAttributes<HTMLTableCellElement> & ExtraProps> = (props) => {
  return <th {...props} className='px-2 border border-input' />;
};

export function MarkdownText(props: MarkdownTextProps) {
  return (
    <Markdown
      className={cn('overflow-auto break-words', props.className)}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: H1,
        h2: H2,
        p: Paragraph,
        blockquote: Blockquote,
        code: Code,
        ul: List,
        ol: OrderedList,
        li: ListItem,
        table: Table,
        tr: TableRow,
        td: TableCell,
        th: TableHeader,
      }}
    >
      {props.children}
    </Markdown>
  );
}
