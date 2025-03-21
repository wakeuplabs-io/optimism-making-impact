import { StrengthHighIcon, StrengthLowIcon, StrengthMediumIcon } from '@/components/icons/strength';
import { Badge } from '@/components/ui/badge';
import { useCardsStepContext } from '@/features/main-section/step-types/cards/context/use-cards-step-context';
import { EditCardModal } from '@/features/main-section/step-types/cards/edit-card-button';
import { useStep } from '@/hooks/use-step';
import { useUser } from '@/hooks/use-user';
import { getColor, getRandomBadgeColor } from '@/lib/utils';
import { CompleteCard } from '@/types/cards';
import { Attribute, CardStrength, Keyword } from '@optimism-making-impact/schemas';
import Markdown from 'react-markdown';

interface CardProps {
  card: CompleteCard;
  stepId: number;
}

export function Card(props: CardProps) {
  const { keywords, attributes } = useCardsStepContext();
  const { isAdminModeEnabled: isAdmin } = useUser();

  const borderColor = getColor(props.card.attribute?.color ?? 'GRAY');

  return (
    <div
      style={{ borderLeftColor: borderColor }}
      className='group flex h-fit min-h-[320px] w-full flex-col gap-6 rounded-2xl border-l-[3px] bg-white p-8 md:w-[45%] lg:w-[320px]'
    >
      <CardTitle card={props.card} stepId={props.stepId} isAdmin={isAdmin} keywords={keywords} attributes={attributes} />
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
  attributes: Attribute[];
}

function CardTitle(props: CardTitleProps) {
  const { editCard, deleteCard } = useStep();

  return (
    <div className='flex items-center max-w-full gap-4'>
      <p className='flex-1 overflow-hidden text-base font-medium truncate text-ellipsis whitespace-nowrap' title={props.card.title}>
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
}

function CardBody(props: CardBodyProps) {
  return (
    <div className='flex flex-1 w-full prose prose-s'>
      <Markdown
        className='w-full overflow-auto break-words'
        components={{
          p: (props) => <p className='m-0 text-sm' {...props} />,
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
    <div className='scroll-s flex h-[50px] w-full justify-between gap-2 overflow-x-auto p-1'>
      {props.keywords.map((keyword, i) => {
        return (
          <Badge
            key={`${keyword.id}-${i}`}
            style={{ backgroundColor: getRandomBadgeColor(keyword.value).background }}
            className='h-fit w-auto min-w-[112px] flex-shrink-0 rounded-full px-6 py-1 text-center text-xs font-normal'
          >
            {keyword.value}
          </Badge>
        );
      })}
    </div>
  );
}
