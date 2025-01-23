import { CompleteItem } from '@/types/items';

interface ItemProps {
  item: CompleteItem;
}

export default function Item(props: ItemProps) {
  return <div>{props.item.markdown}</div>;
}
