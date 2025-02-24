type FormInputWrapperProps = {
  children: React.ReactNode;
  error?: string;
};

export function FormInputWrapper(props: FormInputWrapperProps) {
  return (
    <div className='flex flex-col gap-1'>
      {props.children}
      {props.error && <span className='text-red-500 text-xs'>{props.error}</span>}
    </div>
  );
}
