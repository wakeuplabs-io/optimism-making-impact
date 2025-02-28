import { cn, getColor } from '@/lib/utils';
import { Color, colorList } from '@optimism-making-impact/schemas';
import { createContext, useContext, useState } from 'react';

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
    <ColorContext.Provider value={{ selectedColor, setSelectedColor }}>
      <div
        className={cn(
          'border-1 grid min-h-8 w-fit gap-3 rounded-md border border-input px-2 py-1',
          'grid-cols-5' /* Default to 5 columns */,
          'md:grid-cols-10' /* Use 10 columns for larger screens */,
          props.containerClassName,
        )}
      >
        {colorList.map((color) => (
          <ColorOption key={color} color={color} onClick={handleColorChange} disabled={props.disabled} />
        ))}
      </div>
    </ColorContext.Provider>
  );
}

interface ColorOptionProps {
  color: Color;
  onClick?: (color: Color) => void;
  disabled?: boolean;
}

function ColorOption(props: ColorOptionProps) {
  const { selectedColor } = useColorContext();

  const isSelected = selectedColor === props.color;

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
      <div className={cn('h-[19px] w-[19px] rounded-full', isSelected && 'border-2 border-white')} />
    </button>
  );
}

// Context
interface ColorContextType {
  selectedColor: Color | null;
  setSelectedColor: (color: Color) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

const useColorContext = (): ColorContextType => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColorContext must be used within a ColorProvider');
  }
  return context;
};
