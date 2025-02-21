import { MarkdownText } from '@/components/markdown-text';
import { TextAreaInput } from '@/components/text-area-input';
import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';
import { useToggle } from 'usehooks-ts';

interface EditInfographyMarkdownProps {
  markdown: string;
  onChange: (markdown: string) => void;
  isAdmin?: boolean;
  className?: string;
}

export function EditInfographyMarkdown({ markdown, isAdmin, onChange, className }: EditInfographyMarkdownProps): JSX.Element {
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn('flex items-center lg:px-0', className)}>
      <Container>
        <Content markdown={markdown} isAdmin={isAdmin} onChange={handleTextareaChange} />
      </Container>
    </div>
  );
}

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

function Container(props: ContainerProps) {
  return <div className={cn('flex w-full flex-col items-end gap-2 px-4 lg:px-0', props.className)}>{props.children}</div>;
}

interface ContentProps extends React.HtmlHTMLAttributes<HTMLTextAreaElement> {
  markdown: string;
  isAdmin?: boolean;
  className?: string;
}

function Content({ markdown, isAdmin, className, ...props }: ContentProps) {
  const [editMode, toggleEditMode] = useToggle(false);

  if (editMode && isAdmin) {
    return (
      <>
        <TextAreaInput name='content' rows={7} value={markdown} {...props} />
        <EditIcon onClick={toggleEditMode} isAdmin={isAdmin} />
      </>
    );
  }

  return (
    <>
      <MarkdownText className={cn('w-full overflow-auto break-words', className)}>{markdown}</MarkdownText>
      <EditIcon onClick={toggleEditMode} isAdmin={isAdmin} />
    </>
  );
}

interface EditIconProps {
  onClick: () => void;
  isAdmin?: boolean;
}

function EditIcon(props: EditIconProps) {
  if (!props.isAdmin) return null;

  return (
    <Pencil
      size={14}
      onClick={() => props.onClick()}
      className='cursor-pointer stroke-[#7D7D7D] transition-all duration-300 ease-in-out hover:stroke-black'
    />
  );
}
