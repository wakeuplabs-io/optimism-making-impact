import { StrengthHighIcon, StrengthLowIcon, StrengthMediumIcon } from '@/components/icons/strength';
import { Modal } from '@/components/modal';
import { Badge } from '@/components/ui/badge';
import { useCardsStepContext } from '@/features/main-section/step-types/cards/context/use-cards-step-context';
import { EditCardModal } from '@/features/main-section/step-types/cards/edit-card-button';
import { useStep } from '@/hooks/use-step';
import { useIsMobile } from '@/hooks/use-tresholds';
import { useUser } from '@/hooks/use-user';
import { cn, getColor } from '@/lib/utils';
import { CompleteCard } from '@/types/cards';
import { CompleteKeyword } from '@/types/keywords';
import { Attribute, CardStrength } from '@optimism-making-impact/schemas';
import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';

interface CardProps {
  card: CompleteCard;
  stepId: number;
}

export function Card(props: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewingMore, setIsViewingMore] = useState(false);
  const { keywords, attributes } = useCardsStepContext();
  const { isAdminModeEnabled: isAdmin } = useUser();
  const isMobile = useIsMobile();

  const borderColor = getColor(props.card.attribute?.color ?? 'GRAY');

  return (
    <>
      <div
        style={{ borderLeftColor: borderColor }}
        className='group flex min-h-[320px] w-full flex-col gap-6 rounded-2xl border-l-[3px] bg-white p-8 md:w-[45%] lg:w-[320px]'
      >
        <CardTitle card={props.card} stepId={props.stepId} isAdmin={isAdmin} keywords={keywords} attributes={attributes} />
        <CardBody 
          markdown={props.card.markdown} 
          showMore={isViewingMore}
          onViewMore={() => (isMobile ? setIsViewingMore(true) : setIsModalOpen(true))}
        />
        <CardFooter keywords={props.card.keywords} />
      </div>
      <Modal open={isModalOpen} onOpenChange={(value) => setIsModalOpen(value)}>
        <div className='group flex w-full flex-col justify-between gap-6 bg-white'>
          <CardTitle card={props.card} stepId={props.stepId} isAdmin={isAdmin} keywords={keywords} attributes={attributes} />
          <CardBody markdown={props.card.markdown} showMore={true} />
          <CardFooter keywords={props.card.keywords} />
        </div>
      </Modal>
    </>
  );
}

interface CardTitleProps {
  card: CompleteCard;
  stepId: number;
  isAdmin: boolean;
  keywords: CompleteKeyword[];
  attributes: Attribute[];
}

function CardTitle(props: CardTitleProps) {
  const { editCard, deleteCard } = useStep();

  return (
    <div className='flex max-w-full items-center gap-4'>
      <p className='flex-1 overflow-hidden truncate text-ellipsis whitespace-nowrap text-base font-medium' title={props.card.title}>
        {props.card.title}
      </p>
      <StrengthIndicator strength={props.card.strength} />
      {props.isAdmin && (
        <div className='hidden group-hover:flex'>
          <EditCardModal
            stepId={props.stepId}
            keywords={props.keywords}
            card={props.card}
            onSave={editCard}
            onDelete={deleteCard}
            attributes={props.attributes}
          />
        </div>
      )}
    </div>
  );
}
function StrengthIndicator(props: { strength: CardStrength }) {
  switch (props.strength) {
    case 'LOW':
      return <StrengthLowIcon size={26} />;

    case 'MEDIUM':
      return <StrengthMediumIcon size={26} />;

    case 'HIGH':
      return <StrengthHighIcon size={26} />;

    default:
      return null;
  }
}

interface CardBodyProps {
  markdown: string;
  onViewMore?(): void;
  showMore: boolean;
}

function CardBody({ markdown, showMore, onViewMore }: CardBodyProps) {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const checkOverflow = () => {
    const el = containerRef.current;
    if (el) {
      console.log('isOverflowing: ', el.scrollHeight > el.clientHeight);
      setIsOverflowing(el.scrollHeight > el.clientHeight);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  return (
    <div className={cn('relative h-[120px] overflow-hidden', { 'h-auto max-h-full': showMore })}>
      <div ref={containerRef} className={cn('max-h-[120px] overflow-hidden pr-2', { 'max-h-full': showMore })}>
        <div className='prose prose-sm flex w-full flex-1'>
          <Markdown
            className='w-full break-words'
            components={{
              h1: (props) => <h1 className='text-xl font-bold' {...props} />,
              h2: (props) => <h2 className='text-lg font-bold' {...props} />,
              h3: (props) => <p className='text-md font-bold' {...props} />,
              p: (props) => <p className='m-0 text-sm' {...props} />,
            }}
          >
            {markdown}
          </Markdown>
        </div>

        {/* Mobile-only fade + button */}
        {onViewMore && isOverflowing && !showMore && (
          <div className='absolute bottom-0 flex h-16 w-full cursor-pointer items-end justify-center' onClick={onViewMore}>
            {/* Gradient Fade */}
            <div className='pointer-events-none absolute bottom-0 h-16 w-full bg-gradient-to-b from-transparent to-white' />
            {/* Button */}
            <button className='relative z-10 mb-2 rounded-md bg-white px-4 py-1.5 text-sm font-semibold shadow'>View more</button>
          </div>
        )}
      </div>
    </div>
  );
}

interface CardFooterProps {
  keywords: CompleteKeyword[];
}

function CardFooter(props: CardFooterProps) {
  return (
    <div className='scroll-s flex h-[50px] w-full justify-between gap-2 overflow-x-auto p-1'>
      {props.keywords.map((keyword, i) => {
        return (
          <Badge
            key={`${keyword.id}-${i}`}
            style={{ backgroundColor: keyword.color }}
            className='h-fit w-auto min-w-[112px] flex-shrink-0 rounded-full px-6 py-1 text-center text-xs font-normal'
          >
            {keyword.value}
          </Badge>
        );
      })}
    </div>
  );
}
