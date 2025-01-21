interface CardFiltersProps {
  filters: string[];
}

export function CardFilters(props: CardFiltersProps) {
  return (
    <div className='flex w-[300px] min-w-[300px] bg-purple-300'>
      {props.filters.map((filter) => {
        return <p>{filter}</p>;
      })}
    </div>
  );
}
