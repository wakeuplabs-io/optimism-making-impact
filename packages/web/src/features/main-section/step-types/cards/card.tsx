import { Badge } from '@/components/badge';
import { StrengthHighIcon, StrengthLowIcon, StrengthMediumIcon } from '@/components/icons/strength';
import { MarkdownText } from '@/components/markdown-text';
import { DeleteCardButton } from '@/features/main-section/step-types/cards/delete-card-button';
import { EditCardModal } from '@/features/main-section/step-types/cards/edit-card-button';
import { getRandomBadgeColor } from '@/lib/utils';
import { useUserStore } from '@/state';
import { useFiltersStore } from '@/state/main-section-filters/store';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { CompleteCard, Keyword, StrengthEnum } from '@/types';

interface CardProps {
  card: CompleteCard;
  stepId: number;
}

export function Card(props: CardProps) {
  const { keywords } = useFiltersStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdmin);

  return (
    <div className='0 flex h-fit min-h-[320px] w-[320px] flex-col gap-4 rounded-2xl bg-white p-4'>
      <CardTitle card={props.card} stepId={props.stepId} isAdmin={isAdmin} keywords={keywords} />
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
}

function CardTitle(props: CardTitleProps) {
  const editCard = useMainSectionStore((state) => state.editCard);
  const deleteCard = useMainSectionStore((state) => state.deleteCard);

  return (
    <div className='flex max-w-full items-center gap-4'>
      <p
        className='flex-1 overflow-hidden truncate text-ellipsis whitespace-nowrap text-[18px] font-[400] leading-[22px]'
        title={props.card.title}
      >
        {props.card.title}
      </p>
      <StrengthIndicator strength={props.card.strength} />
      {props.isAdmin && (
        <>
          <EditCardModal stepId={props.stepId} keywords={props.keywords} card={props.card} onClick={editCard} />
          <DeleteCardButton card={props.card} onClick={deleteCard} />
        </>
      )}
    </div>
  );
}

function StrengthIndicator(props: { strength: StrengthEnum }) {
  switch (props.strength) {
    case StrengthEnum.LOW:
      return <StrengthLowIcon size={26} />;

    case StrengthEnum.MEDIUM:
      return <StrengthMediumIcon size={26} />;

    case StrengthEnum.HIGH:
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
    <div className='flex flex-1'>
      <MarkdownText>{props.markdown}</MarkdownText>
    </div>
  );
}

interface CardFooterProps {
  keywords: Keyword[];
}

function CardFooter(props: CardFooterProps) {
  return (
    <div className='flex justify-center gap-2'>
      {props.keywords.map((keyword, i) => {
        return (
          <Badge key={`${keyword.id} - ${i}`} backgroundColor={getRandomBadgeColor(keyword.value)}>
            {keyword.value}
          </Badge>
        );
      })}
    </div>
  );
}
