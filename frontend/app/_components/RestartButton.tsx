'use client';
import { useRouter } from 'next/navigation';

export default function RestartButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push('/lobby')}
      className="w-full py-3 rounded-xl font-extrabold text-2xl text-white hover:brightness-110 transition-all"
      style={{ fontFamily: 'var(--font-nunito)', backgroundColor: 'var(--hm-orange)' }}
    >
      Start Again
    </button>
  );
}
