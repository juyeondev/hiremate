import Image from 'next/image';
import Link from 'next/link';

import githubLogo from '@/resources/icons/github_logo.png';

export default function Footer() {
  return (
    <div className="pb-8 flex items-center gap-2 text-hm-muted text-sm">
      <span>Created by Jay</span>
      <Link href="https://github.com/juyeondev/hiremate" target="_blank" rel="noopener noreferrer">
        <Image src={githubLogo} alt="GitHub" width={30} height={30} />
      </Link>
    </div>
  );
}
