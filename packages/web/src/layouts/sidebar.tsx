import { AddNewRound } from '@/features/sidebar/components/add-new-round';
import { CategoryList } from '@/features/sidebar/components/category-list';
import { DropdownMenu } from '@/features/sidebar/components/dropdown-menu';
import { Logo } from '@/features/sidebar/components/logo';

export function Sidebar() {
  return (
    <nav className="absolute h-full w-[320px] bg-white-high p-12 lg:static">
      <div className="flex h-full flex-col gap-6">
        <Logo />
        <div className="grid gap-2">
          <DropdownMenu />
          <AddNewRound />
        </div>
        <CategoryList />
      </div>
    </nav>
  );
}
