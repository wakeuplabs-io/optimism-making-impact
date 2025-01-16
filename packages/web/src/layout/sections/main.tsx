import { useStepsStore } from '@/state/steps/steps-store';

export function MainSection() {
  const selectedStep = useStepsStore((state) => state.selectedStep);

  return (
    <main className='flex flex-1 flex-col items-center justify-center gap-8 bg-red-100 p-4'>
      <span>{JSON.stringify(selectedStep ?? 'no step selected', null, 2)}</span>
    </main>
  );
}
