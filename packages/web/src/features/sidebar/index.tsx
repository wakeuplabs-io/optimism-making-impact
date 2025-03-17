import OmiLogo from '@/assets/omi-logo.png';
import { CategoryList } from '@/features/sidebar/components/category-list/category-list';
import LogosSection from '@/features/sidebar/components/logos-section';
import { RoundList } from '@/features/sidebar/components/round-list/round-list';
import { SettingsSection } from '@/features/sidebar/components/settings-section/settings-section';
import { WakeUpLogo } from '@/features/sidebar/components/wakeup-logo';

/* import { RoundsService } from '@/services/rounds-service';
import { CompleteRound } from '@/types/rounds';
import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useEffect, useState } from 'react'; */

export function SidebarContent() {
  /*   const { roundId } = useSearch({ from: '/' });
  const { data: rounds = [] } = useQuery({
    queryKey: ['rounds'],
    queryFn: () => RoundsService.getRounds(),
    staleTime: 1000 * 60 * 60 * 24,
  });
  const [selectedRound, setSelectedRound] = useState<CompleteRound | null>(null);
  useEffect(() => {
    if (rounds.length === 0) {
      return;
    }
    const foundRound = rounds.find((round) => round.id === roundId) || null;
    setSelectedRound(foundRound);
  }, [rounds, roundId]); */

  return (
    <div className='flex h-full flex-col items-start gap-6 pb-16'>
      <img src={OmiLogo} alt='Optimism Making Impact Logo' className='w-[127px]' />
      <div className='flex flex-col justify-start gap-4 md:justify-between'>
        <div className='flex flex-col gap-4'>
          <RoundList />
          <hr />
          {<CategoryList />}
          <hr />
          <LogosSection />
          <hr />
          <SettingsSection />
        </div>
        <WakeUpLogo />
      </div>
    </div>
  );
}
