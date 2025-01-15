import { useStepsStore } from '@/state/steps/steps-store';

export function MainSection() {
  const selectedStep = useStepsStore((state) => state.selectedStep);

  return (
    <main className='flex flex-col items-center justify-center flex-1 gap-8 p-4 bg-red-100'>
      <span>{JSON.stringify(selectedStep ?? 'no step selected', null, 2)}</span>
    </main>
  );
}
