import { ItemFilters } from '@/features/main-section/step-types/items/filters-list';
import { ItemsList } from '@/features/main-section/step-types/items/items-list';
import { cn } from '@/lib/utils';
import { useFiltersStore } from '@/state/main-section-filters/store';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { useEffect } from 'react';

export function ItemsStep() {
  const { step } = useMainSectionStore((state) => state);
  const clearSelectedFilters = useFiltersStore((state) => state.clearSelectedFilters);

  useEffect(() => {
    return () => clearSelectedFilters();
  }, [step?.id]);

  if (!step) {
    return (
      <div className={cn('flex h-full w-full flex-col gap-4')}>
        <div className='flex h-full w-full items-center justify-center'>Select a step</div>
      </div>
    );
  }

  return (
    <div className={cn('flex h-full w-full flex-col gap-4')}>
      <div className='flex flex-col lg:flex-row'>
        <ItemFilters smartList={step.smartList} stepId={step.id} />
        <ItemsList items={step.items} stepId={step.id} title={step.description} attributes={step.smartList?.attributes} />
      </div>
    </div>
  );
}
