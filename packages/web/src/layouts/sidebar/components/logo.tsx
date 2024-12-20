import letterO from '@/layouts/sidebar/assets/logo/letter-o.png';
import letterP from '@/layouts/sidebar/assets/logo/letter-p.png';

export function Logo() {
  const logoStyles = 'h-[22px] w-[23px] 2xl:h-[24px] 2xl:w-[25px]';

  return (
    <div className="flex h-6 gap-0.5">
      <img className={logoStyles} src={letterO} alt="Letter O" />
      <img className={logoStyles} src={letterP} alt="Letter P" />
      <h1 className="2xl:mt-[1px]">Impact</h1>
    </div>
  );
}
