import { CardList } from '@/features/main-section/step-types/cards/card-list';
import { CardFilters } from '@/features/main-section/step-types/cards/filters';
import { cn } from '@/lib/utils';
import { useMainSectionStore } from '@/state/main-section/main-section-store';

export function CardStep() {
  return (
    <Container>
      <Content />
    </Container>
  );
}

function Container(props: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex h-full w-full flex-col gap-4', props.className)}>{props.children}</div>;
}

function Content() {
  const { step } = useMainSectionStore((state) => state);

  if (!step) {
    return <div className='flex items-center justify-center w-full h-full'>Select a step</div>;
  }

  return (
    <div className='flex flex-col lg:flex-row'>
      <CardFilters filters={['Filter 1', 'Filter 2', 'Filter 3']} />
      <CardList cards={step.cards} />
    </div>
  );
}
