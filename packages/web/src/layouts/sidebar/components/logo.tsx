import letterO from '@/layouts/sidebar/assets/logo/letter-o.png';
import letterP from '@/layouts/sidebar/assets/logo/letter-p.png';

export function Logo() {
  return (
    <div className="flex h-6 gap-0.5">
      <img src={letterO} alt="Letter O" />
      <img src={letterP} alt="Letter P" />
      <h1 className="mt-0.5">Impact</h1>
    </div>
  );
}
