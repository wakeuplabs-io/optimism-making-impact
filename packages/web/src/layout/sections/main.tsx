import { useStepsStore } from '@/state';

export function MainSection() {
  const selectedStep = useStepsStore((state) => state.selectedStep);
  return <main className="flex items-center justify-center flex-1 bg-red-100">{selectedStep.name}</main>;
}
