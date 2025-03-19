import { MainSectionContent } from '@/features/main-section';
import { useIsMobile } from '@/hooks/use-tresholds';
import { cn } from '@/lib/utils';

export function MainSection() {
  const isMobile = useIsMobile();
  return (
    <main
      className={cn('flex flex-1 flex-col gap-8 px-8 pb-36 lg:px-0 lg:pb-0', {
        // We add overflow-y-auto so only the main section scrolls on mobile
        'overflow-y-auto': isMobile,
      })}
    >
      <MainSectionContent />
    </main>
  );
}
