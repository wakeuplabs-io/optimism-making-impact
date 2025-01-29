import { useId } from 'react';

interface IconProps {
  size?: string | number;
}

export function StrengthLowIcon({ size = 20 }: IconProps) {
  const uniqueId = useId(); // Generate a unique ID

  return (
    <svg width={size} height={size} viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='13' cy='13' r='13' fill={`url(#${uniqueId})`} />
      <g clipPath={`url(#clip-${uniqueId})`}>
        <path
          d='M16.9037 16.903L8.57153 8.5708M16.9037 16.903L9.76184 16.903M16.9037 16.903L16.9037 9.76111'
          stroke='white'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <linearGradient id={uniqueId} x1='13' y1='0' x2='13' y2='26' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#FFCCC5' />
          <stop offset='1' stopColor='#FF4E36' />
        </linearGradient>
        <clipPath id={`clip-${uniqueId}`}>
          <rect width='14' height='14' fill='white' transform='translate(6 6)' />
        </clipPath>
      </defs>
    </svg>
  );
}

export function StrengthMediumIcon({ size = 20 }: IconProps) {
  const uniqueId = useId(); // Generate a unique ID

  return (
    <svg width={size} height={size} viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='13' cy='13' r='13' fill={`url(#${uniqueId})`} />
      <g clipPath={`url(#clip-${uniqueId})`}>
        <path
          d='M18.6289 12.7368L6.84546 12.7368M18.6289 12.7368L13.5789 17.7869M18.6289 12.7368L13.5789 7.68677'
          stroke='white'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <linearGradient id={uniqueId} x1='13' y1='0' x2='13' y2='26' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#FFEEBE' />
          <stop offset='1' stopColor='#FFC422' />
        </linearGradient>
        <clipPath id={`clip-${uniqueId}`}>
          <rect width='14' height='14' fill='white' transform='translate(6 6)' />
        </clipPath>
      </defs>
    </svg>
  );
}

export function StrengthHighIcon({ size = 20 }: IconProps) {
  const uniqueId = useId(); // Generate a unique ID

  return (
    <svg width={size} height={size} viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='13' cy='13' r='13' fill={`url(#${uniqueId})`} />
      <g clipPath={`url(#clip-${uniqueId})`}>
        <path
          d='M16.903 8.57092L8.5708 16.9031M16.903 8.57092L16.903 15.7128M16.903 8.57092L9.76111 8.57092'
          stroke='white'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <linearGradient id={uniqueId} x1='13' y1='0' x2='13' y2='26' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#87DEB2' />
          <stop offset='1' stopColor='#AFBD9E' />
        </linearGradient>
        <clipPath id={`clip-${uniqueId}`}>
          <rect width='14' height='14' fill='white' transform='translate(6 6)' />
        </clipPath>
      </defs>
    </svg>
  );
}
