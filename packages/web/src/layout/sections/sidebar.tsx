import OmiLogo from '@/assets/omi-logo.png';
import WakeUpLogo from '@/assets/wake-up-logo.png';
import { ImageButton } from '@/components/image-button';
import { SelectInput } from '@/components/inputs/select-input';
import { SideMenu } from '@/components/side-menu';
import { WAKEUP_URL } from '@/config';
import { AddCategoryModal } from '@/features/sidebar/components/add-category-modal';
import { AuthSection } from '@/features/sidebar/components/auth-section';
import { CategoryList } from '@/features/sidebar/components/category-list';
import { CreateRoundModal } from '@/features/sidebar/components/create-round-modal';
import LogosSection from '@/features/sidebar/components/logos-section';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { getRoundName } from '@/lib/utils';
import { useSidebarStore, useUserStore } from '@/state';
import { Menu } from 'lucide-react';
import { useMemo } from 'react';

export function SidebarSection() {
  return (
    <SidebarContainer>
      <SidebarContent />
    </SidebarContainer>
  );
}

interface SidebarContainerProps {
  children: React.ReactNode;
}

function SidebarContainer(props: SidebarContainerProps) {
  const isMobile = useIsMobile();
  const selectedRoundId = useSidebarStore((state) => state.selectedRound)?.id;
  const roundName = selectedRoundId ? getRoundName(selectedRoundId) : 'Round';

  if (isMobile) {
    // Render as a Sheet on Mobile
    return (
      <nav className='flex items-center justify-start w-full gap-4 p-3 h-28 lg:static'>
        <SideMenu trigger={<Menu className='text-black' />} description='Sidebar' side='left' className='w-[320px]' triggerAsChild>
          {props.children}
        </SideMenu>
        <span>{roundName}</span>
      </nav>
    );
  }

  // Render static sidebar on Desktop
  return (
    <div className='w-[320px] overflow-y-auto overflow-x-hidden p-6'>
      <nav className='ml-auto h-full w-[220px] bg-white-high lg:static'>{props.children}</nav>
    </div>
  );
}

function SidebarContent() {
  const addCategory = useSidebarStore((state) => state.addCategory);
  const addRound = useSidebarStore((state) => state.addRound);
  const selectedRound = useSidebarStore((state) => state.selectedRound);
  const rounds = useSidebarStore((state) => state.rounds);
  const setSelectedRound = useSidebarStore((state) => state.setSelectedRound);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);
  const roundOptions = useMemo(() => rounds.map((round) => ({ label: getRoundName(round.id), value: round.id.toString() })), [rounds]);

  return (
    <div className='flex flex-col justify-between h-full gap-10'>
      <div className='flex justify-center'>
        <img src={OmiLogo} alt='Optimism Making Impact Logo' className='w-[127px]' />
      </div>
      <div className='flex flex-col justify-between flex-1'>
        <div className='flex flex-col flex-1 gap-4'>
          <SelectInput
            name='round'
            placeholder='Select Round'
            items={roundOptions}
            disabled={roundOptions.length === 0}
            value={selectedRound?.id.toString()}
            onValueChange={(val) => setSelectedRound(+val)}
            triggerClassName='border-grey-[#F2F2F2]'
          />
          {isAdmin && (
            <div className='flex justify-center w-full gap-1'>
              <CreateRoundModal onSave={addRound} />
              {selectedRound && <AddCategoryModal roundId={selectedRound.id} onSave={addCategory} />}
            </div>
          )}
          {selectedRound && <CategoryList categories={selectedRound.categories} />}
          <LogosSection />
        </div>
        <AuthSection />
      </div>
      <a href={WAKEUP_URL} target='_blank' rel='noreferrer'>
        <ImageButton src={WakeUpLogo} alt='WakeUp Logo' className='w-[124px]' />
      </a>
    </div>
  );
}
