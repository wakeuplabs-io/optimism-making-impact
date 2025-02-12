import { StrengthHighIcon, StrengthLowIcon, StrengthMediumIcon } from '@/components/icons/strength';
import { MarkdownText } from '@/components/markdown-text';
import { Badge } from '@/components/ui/badge';
import { EditCardModal } from '@/features/main-section/step-types/cards/edit-card-button';
import { getRandomBadgeColor } from '@/lib/utils';
import { useUserStore } from '@/state';
import { useFiltersStore } from '@/state/main-section-filters/store';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { Attribute, CompleteCard, Keyword, StrengthEnum } from '@/types';

interface CardProps {
  card: CompleteCard;
  stepId: number;
}

export function Card(props: CardProps) {
  const { keywords, attributes } = useFiltersStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);

  return (
    <div className='flex h-fit w-full min-h-[320px] flex-col gap-4 rounded-2xl bg-white p-8 md:w-[45%] lg:w-[320px] '>
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
      <p
        className='flex-1 overflow-hidden truncate text-ellipsis whitespace-nowrap text-[18px] font-[400] leading-[22px]'
        title={props.card.title}
      >
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
    <div className='flex flex-wrap justify-between w-full gap-2'>
      {props.keywords.map((keyword, i) => {
        return (
          <Badge
            key={`${keyword.id}-${i}`}
            style={{ backgroundColor: getRandomBadgeColor(keyword.value) }}
            className='inline-block w-[48%] truncate rounded-full px-6 py-1 text-center'
          >
            {keyword.value}
          </Badge>
        );
      })}
    </div>
  );
}
