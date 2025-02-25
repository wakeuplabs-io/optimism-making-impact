interface FormErrorMessageProps {
  error: string;
}

export function FormErrorMessage({ error }: FormErrorMessageProps) {
  return <p className='text-xs text-red-500 min-h-[20px]'>{error || ' '}</p>;
}
