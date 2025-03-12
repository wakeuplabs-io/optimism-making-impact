import { cn, getColor } from '@/lib/utils';
import { Color, colorList } from '@optimism-making-impact/schemas';
import { useState } from 'react';

interface ColorSelectInputProps {
  onChange?: (color: Color) => void;
  selected?: Color;
  disabled?: boolean;
  containerClassName?: string;
}

export function ColorSelectInput(props: ColorSelectInputProps) {
  const [selectedColor, setSelectedColor] = useState<Color | null>(props.selected ?? null);

  const handleColorChange = (color: Color) => {
    setSelectedColor(color);
    props.onChange?.(color);
  };

  return (
    <div
      className={cn(
        'border-1 grid min-h-8 w-fit gap-3 rounded-md border border-input px-2 py-1',
        'grid-cols-5',
        'md:grid-cols-10',
        props.containerClassName,
      )}
    >
      {colorList.map((color) => (
        <ColorOption key={color} color={color} onClick={handleColorChange} disabled={props.disabled} isSelected={selectedColor === color} />
      ))}
    </div>
  );
}

interface ColorOptionProps {
  color: Color;
  onClick?: (color: Color) => void;
  disabled?: boolean;
  isSelected: boolean;
}

function ColorOption(props: ColorOptionProps) {
  return (
    <button
      className={cn('flex h-[23px] w-[23px] items-center justify-center rounded-full', props.disabled && 'opacity-50')}
      style={{ backgroundColor: getColor(props.color) }}
      onClick={(e) => {
        e.preventDefault();
        props.onClick?.(props.color);
      }}
      disabled={props.disabled}
    >
      <div className={cn('h-[19px] w-[19px] rounded-full', props.isSelected && 'border-2 border-white')} />
    </button>
  );
}
