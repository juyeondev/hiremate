import Link from 'next/link';

import HiremateTitle from './HiremateTitle';

export default function Header() {
  return (
    <header className="w-full bg-hm-soft flex items-center justify-center py-3">
      <Link href="/">
        <HiremateTitle className="w-48 h-auto -mt-1 -mb-1" strokeColor="#6C9EFF" />
      </Link>
    </header>
  );
}
