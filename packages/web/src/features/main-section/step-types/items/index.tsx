import { ItemFilters } from '@/features/main-section/step-types/items/filters-list';
import { ItemsList } from '@/features/main-section/step-types/items/items-list';
import { cn } from '@/lib/utils';
import { useMainSectionStore } from '@/state/main-section/main-section-store';

export function ItemsStep() {
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
      <ItemFilters />
      <ItemsList items={step.items} stepId={step.id} />
    </div>
  );
}
