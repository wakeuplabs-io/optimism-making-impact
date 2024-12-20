import { DropdownMenu } from '@/features/sidebar/components/dropdown-menu';
import { Logo } from '@/features/sidebar/components/logo';

export function Sidebar() {
  return (
    <nav className="absolute h-full w-[320px] bg-white-high p-12 lg:static">
      <div className="flex h-full flex-col gap-6">
        <Logo />
        <DropdownMenu />
      </div>
    </nav>
  );
}
