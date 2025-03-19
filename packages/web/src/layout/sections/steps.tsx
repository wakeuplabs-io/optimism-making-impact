import { StepsSectionContent } from '@/features/step-section';

export function StepsSection() {
  return (
    <header className='fixed z-50 flex items-center justify-center w-full bg-white/30 backdrop-blur-md lg:relative lg:w-auto lg:bg-inherit lg:backdrop-blur-none'>
      <div className='flex items-center justify-center flex-1 max-w-full gap-4 px-8 pt-4 pb-12 overflow-hidden lg:items-start lg:px-0 lg:pb-10 lg:pt-16'>
        <StepsSectionContent />
      </div>
    </header>
  );
}
