import { useMemo } from 'react';
import OmiLogo from '@/assets/omi-logo.png';
import WakeUpLogo from '@/assets/wake-up-logo.png';
import { ImageButton } from '@/components/image-button';
import { SelectInput } from '@/components/inputs/select-input';
import { SideMenu } from '@/components/side-menu';
import { WAKEUP_URL } from '@/config';
import { AuthSection } from '@/features/sidebar/components/auth-section';
import { CategoryList } from '@/features/sidebar/components/category-list';
import { CreateRoundModal } from '@/features/sidebar/components/create-round-modal';
import LogosSection from '@/features/sidebar/components/logos-section';
import { useIsMobile } from '@/hooks/use-tresholds';
import { getRoundName } from '@/lib/utils';
import { useSidebarStore, useUserStore } from '@/state';
import { Menu } from 'lucide-react';
import { RoundList } from '@/features/sidebar/components/round-list';

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
  const { selectedRound, selectedCategoryId } = useSidebarStore((state) => state);

  //Check if category is selected
  const title = useMemo(() => {
    if (!selectedRound) {
      return 'Round';
    }

    const category = selectedRound.categories.find((category) => category.id === selectedCategoryId);

    if (!category) {
      return getRoundName(selectedRound.id);
    }

    return category.name;
  }, [selectedRound, selectedCategoryId]);

  if (isMobile) {
    // Render as a Sheet on Mobile
    return (
      <nav className='flex w-full items-center justify-start gap-12 pt-14 px-8 pb-7 bg-[#F1F4F9] lg:static '>
        <SideMenu
          trigger={<Menu className='text-black w-[50px] h-[50px]' strokeWidth={1} />}
          description='Sidebar'
          side='left'
          className='w-[320px]'
          triggerAsChild
        >
          {props.children}
        </SideMenu>
        <span className='text-2xl text-secondary font-semibold  '>{title}</span>
      </nav>
    );
  }

  // Render static sidebar on Desktop
  return (
    <div className='w-[320px] overflow-y-auto overflow-x-hidden p-6'>
      <nav className='h-full w-[220px] bg-white-high mx-auto lg:static'>{props.children}</nav>
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
    <div className='flex h-full flex-col justify-between gap-6'>
      <img src={OmiLogo} alt='Optimism Making Impact Logo' className='w-[127px]' />
      <div className='flex flex-1 flex-col justify-start md:justify-between gap-8'>
        <div className='flex flex-col gap-4'>
          {/* <SelectInput
            name='round'
            placeholder='Select Round'
            items={roundOptions}
            disabled={roundOptions.length === 0}
            value={selectedRound?.id.toString()}
            onValueChange={(val) => setSelectedRound(+val)}
            triggerClassName='border-grey-[#F2F2F2]'
          /> */}
          {/* {isAdmin && (
            <div className='flex w-full justify-center gap-1'>
              <CreateRoundModal onSave={addRound} />
              {selectedRound && <AddCategoryModal roundId={selectedRound.id} onSave={addCategory} />}
            </div>
          )} */}
          {/* {selectedRound && <CategoryList title="Round" categories={selectedRound.categories} />} */}
          {rounds.length > 0 && <RoundList title="Rounds" rounds={rounds} />}
          <hr className=' border-[#D9D9D9]' />
          {selectedRound && <CategoryList title="Categories" categories={selectedRound.categories} />}
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
