interface MainSectionContainerProps {
  children: React.ReactNode;
}

export function MainSectionContainer(props: MainSectionContainerProps) {
  return <main className='flex flex-1 flex-col items-center justify-center gap-8 bg-red-100 p-4'>{props.children}</main>;
}
