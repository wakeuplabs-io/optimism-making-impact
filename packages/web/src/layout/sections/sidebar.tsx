import WakeUpLogo from '@/assets/wake-up-logo.png';
import { CategoryList } from '@/features/sidebar/components/category-list';
import { Logo } from '@/features/sidebar/components/logo';
import LogosSection from '@/features/sidebar/components/logos-section';
import { Rounds } from '@/features/sidebar/components/rounds';

export function SidebarSection() {
  return (
    <nav className='absolute h-full w-[320px] bg-white-high p-6 lg:static'>
      <div className='flex h-full flex-col gap-6'>
        <Logo />
        <Rounds />
        <CategoryList />
        <LogosSection />
        <img src={WakeUpLogo} alt='' className='w-[124px]' />
      </div>
    </nav>
  );
}
