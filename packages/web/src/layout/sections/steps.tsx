import { StepsSectionContent } from '@/features/step-section';

// TODO: review this component!!!!

export function StepsSection() {
  return (
    <header className='flex items-center justify-center w-full z-50 bg-white/30 backdrop-blur-md fixed lg:w-auto lg:bg-inherit lg:backdrop-blur-none lg:relative'>
      <StepsSectionContent />
    </header>
  );
}
