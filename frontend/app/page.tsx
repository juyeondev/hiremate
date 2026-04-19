'use client';

import Link from 'next/link';
import { useState } from 'react';

import Footer from './_components/Footer';
import HelpModal from './_components/HelpModal';
import HiremateTitle from './_components/HiremateTitle';
import LogoWithSparks from './_components/LogoWithSparks';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-background flex flex-col items-center px-6">
      <button
        onClick={() => setModalOpen(true)}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#7B9CF4] flex items-center justify-center text-white font-bold text-2xl shadow-sm hover:brightness-110 transition-all"
      >
        ?
      </button>

      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <LogoWithSparks />
        <HiremateTitle />
        <p className="text-hm-muted text-base">Your personal AI interview partner.</p>
        <Link
          href="/lobby"
          className="mt-6 px-25 py-3 bg-gradient-to-b from-[#87B0FF] to-[#6D9EFF] text-white font-bold text-3xl rounded-full hover:brightness-110 transition-all"
          style={{ fontFamily: 'var(--font-nunito)' }}
        >
          Start
        </Link>
      </div>

      <Footer />

      {modalOpen && <HelpModal onClose={() => setModalOpen(false)} />}
    </main>
  );
}
