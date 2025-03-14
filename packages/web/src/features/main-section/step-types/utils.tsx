import { ColorDot } from '@/components/color-dot';
import { strengthItems } from '@/types/common';
import { Attribute } from '@optimism-making-impact/schemas';

export const strengthOptions = strengthItems.map(({ value }) => ({ label: value.toLowerCase(), value }));

export type AttributeOption = {
  value: string;
  label: React.ReactNode;
};

export function attributesOptionsMapper(options: Attribute[]): AttributeOption[] {
  return options.map((a) => ({
    value: a.id.toString(),
    label: (
      <div className='flex items-center gap-2'>
        <ColorDot color={a.color} />
        <span>{a.value}</span>
      </div>
    ),
  }));
}
