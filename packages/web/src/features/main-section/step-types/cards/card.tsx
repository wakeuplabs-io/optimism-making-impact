import { StrengthHighIcon, StrengthLowIcon, StrengthMediumIcon } from '@/components/icons/strength';
import { Badge } from '@/components/ui/badge';
import { EditCardModal } from '@/features/main-section/step-types/cards/edit-card-button';
import { getColor, getRandomBadgeColor } from '@/lib/utils';
import { useFiltersStore } from '@/state/main-section-filters/store';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { useUserStore } from '@/state/user-store/user-store';
import { CompleteCard } from '@/types/cards';
import { Attribute, CardStrength, Keyword } from '@optimism-making-impact/schemas';
import { useState } from 'react';
import Markdown from 'react-markdown';

interface CardProps {
  card: CompleteCard;
  stepId: number;
}

export function Card(props: CardProps) {
  const { keywords, attributes } = useFiltersStore((state) => state);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);

  const borderColor = getColor(props.card.attribute?.color ?? 'GRAY');

  return (
    <div
      style={{ borderLeftColor: borderColor }}
      className='flex h-fit min-h-[320px] w-full flex-col gap-6 rounded-2xl border-l-[3px] bg-white p-8 md:w-[45%] lg:w-[320px]'
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <CardTitle
        card={props.card}
        stepId={props.stepId}
        isAdmin={isAdmin}
        keywords={keywords}
        attributes={attributes}
        isCardHovered={isCardHovered}
      />
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
  isCardHovered: boolean;
}

function CardTitle(props: CardTitleProps) {
  const editCard = useMainSectionStore((state) => state.editCard);
  const deleteCard = useMainSectionStore((state) => state.deleteCard);

  return (
    <div className='flex max-w-full items-center gap-4'>
      <p className='flex-1 overflow-hidden truncate text-ellipsis whitespace-nowrap text-base font-medium' title={props.card.title}>
        {props.card.title}
      </p>
      <StrengthIndicator strength={props.card.strength} />
      {props.isAdmin && props.isCardHovered && (
        <EditCardModal
          stepId={props.stepId}
          keywords={props.keywords}
          card={props.card}
          onSave={editCard}
          onDelete={deleteCard}
          attributes={props.attributes}
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
    <div className='prose-s prose flex w-full flex-1'>
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
            className='inline-block w-full h-fit rounded-full px-6 py-1 text-center text-xs font-normal'
          >
            {keyword.value}
          </Badge>
        );
      })}
    </div>
  );
}
