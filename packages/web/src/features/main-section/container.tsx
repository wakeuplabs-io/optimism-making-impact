interface MainSectionContainerProps {
  children: React.ReactNode;
}

export function MainSectionContainer(props: MainSectionContainerProps) {
  return <main className='flex flex-1 flex-col items-center gap-8 overflow-y-scroll p-4'>{props.children}</main>;
}
