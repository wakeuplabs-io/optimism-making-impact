import { CategoryList } from '@/features/sidebar/components/category-list';
import { Logo } from '@/features/sidebar/components/logo';
import { Rounds } from '@/features/sidebar/components/rounds';

export function Sidebar() {
  return (
    <nav className="absolute h-full w-[320px] bg-white-high p-12 lg:static">
      <div className="flex h-full flex-col gap-6">
        <Logo />
        <Rounds />
        <CategoryList />
      </div>
    </nav>
  );
}
