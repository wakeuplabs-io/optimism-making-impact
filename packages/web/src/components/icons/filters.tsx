interface Props {
  size?: number | string;
  color?: string;
}

export function FiltersIcon({ size = 20, color = 'black' }: Props) {
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M21 4H14' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M10 4H3' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M21 12H12' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M8 12H3' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M21 20H16' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M12 20H3' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M14 2V6' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M8 10V14' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M16 18V22' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}
