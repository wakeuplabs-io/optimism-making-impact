import OmiLogo from '@/assets/omi-logo.png';
import { CategoryList } from '@/features/sidebar/components/category-list/category-list';
import LogosSection from '@/features/sidebar/components/logos-section';
import { RoundList } from '@/features/sidebar/components/round-list/round-list';
import { SettingsSection } from '@/features/sidebar/components/settings-section/settings-section';
import { WakeUpLogo } from '@/features/sidebar/components/wakeup-logo';

export function SidebarContent() {
  return (
    <div className='flex h-full flex-col items-start gap-6 pb-16'>
      <img src={OmiLogo} alt='Optimism Making Impact Logo' className='w-[200px]' />
      <div className='flex flex-col justify-start gap-4 md:justify-between'>
        <div className='flex flex-col gap-4'>
          <RoundList />
          <hr />
          <CategoryList />
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
