import { Badge } from '@/components/badge';
import { StrengthHighIcon, StrengthLowIcon, StrengthMediumIcon } from '@/components/icons/strength';
import { MarkdownText } from '@/components/markdown-text';
import { getRandomBadgeColor } from '@/lib/utils';
import { CompleteCard, Keyword, StrengthEnum } from '@/types';

interface CardProps {
  card: CompleteCard;
}

export function Card(props: CardProps) {
  return (
    <div className='0 flex h-fit min-h-[320px] w-[320px] flex-col gap-4 rounded-2xl bg-white p-4'>
      <CardTitle title={props.card.title} strength={props.card.strength} />
      <CardBody markdown={props.card.markdown} />
      <CardFooter keywords={props.card.keywords} />
    </div>
  );
}

interface CardTitleProps {
  title: string;
  strength: StrengthEnum;
}

function CardTitle(props: CardTitleProps) {
  return (
    <div className='flex'>
      <p className='flex-1 text-[18px] font-[400] leading-[22px]'>{props.title}</p>
      <div className='flex'>
        <StrengthIndicator strength={props.strength} />
      </div>
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
    <div className='flex w-full flex-wrap justify-start gap-2'>
      {props.keywords.map((keyword, i) => {
        return (
          <Badge key={`${keyword.id}-${i}`} backgroundColor={getRandomBadgeColor(keyword.value)} className='w-[45%] truncate text-center'>
            {keyword.value}
          </Badge>
        );
      })}
    </div>
  );
}
