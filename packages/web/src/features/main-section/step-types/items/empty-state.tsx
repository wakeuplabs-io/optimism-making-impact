export function EmptyState() {
  return (
    <EmptyStateWrapper>
      <p>No item matches applied filters</p>
    </EmptyStateWrapper>
  );
}

export function NoAttributesEmptyState() {
  return (
    <EmptyStateWrapper>
      <p>No Attributes created yet</p>
    </EmptyStateWrapper>
  );
}

function EmptyStateWrapper({ children }: { children: React.ReactNode }) {
  return <div className='flex h-full w-full items-center justify-center'>{children}</div>;
}
