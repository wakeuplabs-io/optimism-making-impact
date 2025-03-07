import { StrengthHighIcon, StrengthLowIcon, StrengthMediumIcon } from '@/components/icons/strength';
import { Badge } from '@/components/ui/badge';
import { EditCardModal } from '@/features/main-section/step-types/cards/edit-card-button';
import { getColor, getRandomBadgeColor } from '@/lib/utils';
import { useUserStore } from '@/state';
import { useFiltersStore } from '@/state/main-section-filters/store';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { CompleteCard } from '@/types';
import { CardStrength, Keyword, Attribute } from '@optimism-making-impact/schemas';
import Markdown from 'react-markdown';

interface CardProps {
  card: CompleteCard;
  stepId: number;
}

export function Card(props: CardProps) {
  const { keywords, attributes } = useFiltersStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);

  const borderColor = getColor(props.card.attribute?.color ?? 'GRAY');

  return (
    <div
      style={{ borderLeftColor: borderColor }}
      className={`flex h-fit w-full min-h-[320px] flex-col gap-6 rounded-2xl bg-white p-8 md:w-[45%] lg:w-[320px] border-l-[3px]`}
    >
      <CardTitle card={props.card} stepId={props.stepId} isAdmin={isAdmin} keywords={keywords} atributes={attributes} />
      <CardBody markdown={props.card.markdown} />
      <CardFooter keywords={props.card.keywords} />
    </div>
  );
}

interface CardTitleProps {
  card: CompleteCard;
  stepId: number;
  isAdmin: boolean;
  keywords: Keyword[];
  atributes: Attribute[];
}

function CardTitle(props: CardTitleProps) {
  const editCard = useMainSectionStore((state) => state.editCard);
  const deleteCard = useMainSectionStore((state) => state.deleteCard);

  return (
    <div className='flex items-center max-w-full gap-4'>
      <p className='flex-1 overflow-hidden truncate text-ellipsis whitespace-nowrap text-base font-medium' title={props.card.title}>
        {props.card.title}
      </p>
      <StrengthIndicator strength={props.card.strength} />
      {props.isAdmin && (
        <EditCardModal
          stepId={props.stepId}
          keywords={props.keywords}
          card={props.card}
          onSave={editCard}
          onDelete={deleteCard}
          attributes={props.atributes}
        />
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
}

function CardBody(props: CardBodyProps) {
  return (
    <div className='prose prose-s flex flex-1 w-full'>
      <Markdown
        className='w-full overflow-auto break-words'
        components={{
          p: (props) => <p className='text-sm m-0' {...props} />,
        }}
      >
        {props.markdown}
      </Markdown>
    </div>
  );
}

interface CardFooterProps {
  keywords: Keyword[];
}

function CardFooter(props: CardFooterProps) {
  return (
    <div className='flex justify-between w-full gap-2 pb-1 overflow-x-auto'>
      {props.keywords.map((keyword, i) => {
        return (
          <Badge
            key={`${keyword.id}-${i}`}
            style={{ backgroundColor: getRandomBadgeColor(keyword.value) }}
            className='inline-block w-[48%] rounded-full px-6 py-1 text-center text-xs font-normal'
          >
            {keyword.value}
          </Badge>
        );
      })}
    </div>
  );
}
