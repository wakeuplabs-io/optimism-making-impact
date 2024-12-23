import { Button } from '@/components/ui/button';
import { useSidebarStore } from '@/state';
import { Blocks } from 'lucide-react';
import { useState } from 'react';

export function CategoryList() {
  const categoriesState = useSidebarStore((state) => state);
  const [activeCategory, setActiveCategory] = useState(categoriesState.categories[0]?.id);

  function handleCategoryClick(categoryId: string) {
    setActiveCategory(categoryId);
  }

  const categories = categoriesState.categories.map((category) => (
    <li key={category.id}>
      <IconButton text={category.name} isActive={activeCategory == category.id} onClick={() => handleCategoryClick(category.id)} />
    </li>
  ));

  return <ul>{categories}</ul>;
}

type IconButtonProps = {
  text: string;
  isActive: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
export function IconButton(props: IconButtonProps) {
  return (
    <Button
      className={`flex w-full items-center justify-start rounded-xl px-2.5 py-5 shadow-none hover:text-dark-high ${
        props.isActive ? 'bg-background text-dark-high hover:bg-background' : 'bg-white-high text-secondary hover:bg-white-medium'
      }`}
    >
      <Blocks strokeWidth={1.7} style={{ width: '22px', height: '22px' }} />
      <span className="text-sm font-semibold leading-5 2xl:text-base">{props.text}</span>
    </Button>
  );
}
