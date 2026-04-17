'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import githubLogo from '@/resources/icons/github_logo.png';
import hirematelogo from '@/resources/icons/hiremate_logo.png';
import sparkPurple from '@/resources/icons/spark_purple.png';
import sparkYellow from '@/resources/icons/spark_yellow.png';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#E8EDF8] flex flex-col items-center px-6">
      {/* ? button */}
      <button
        onClick={() => setModalOpen(true)}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#7B9CF4] flex items-center justify-center text-white font-bold text-2xl shadow-sm hover:brightness-110 transition-all"
      >
        ?
      </button>

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        {/* Logo + sparks */}
        <div className="relative">
          {/* TODO(human): sparkPurple 추가 */}
          <Image src={sparkYellow} alt="" width={23} height={27}
            className="absolute -bottom-5 -left-23" />
          <Image src={sparkPurple} alt="" width={23} height={27}
            className="absolute -bottom-3 -right-19" />
          <Image src={sparkYellow} alt="" width={15} height={18}
            className="absolute -bottom-6 -right-23" />
          <Image src={hirematelogo} alt="Hiremate mascot" width={120} height={120} />
        </div>

        {/* Title */}
        <svg viewBox="0 0 270 72" className="w-64 h-auto -mt-3 -mb-2" xmlns="http://www.w3.org/2000/svg">
          <text
            x="135"
            y="58"
            textAnchor="middle"
            fontFamily="var(--font-nunito)"
            fontSize="58"
            fontWeight="800"
            stroke="#6C9EFF"
            strokeWidth="13"
            strokeLinejoin="round"
            fill="white"
            paintOrder="stroke fill"
          >
            Hiremate
          </text>
        </svg>

        {/* Subtitle */}
        <p className="text-[#8a8fa8] text-m">Your personal AI interview partner.</p>

        {/* Start button */}
        <Link
          href="/lobby"
          className="mt-6 px-25 py-3 bg-gradient-to-b from-[#87B0FF] to-[#6D9EFF] text-white font-bold text-3xl rounded-full hover:brightness-110 transition-all"
          style={{ fontFamily: 'var(--font-nunito)' }}
        >
          Start
        </Link>
      </div>

      {/* Footer */}
      <div className="pb-8 flex items-center gap-2 text-gray-400 text-sm">
        <span>Created by Jay</span>
        <Link href="https://github.com/juyeondev/hiremate" target="_blank" rel="noopener noreferrer">
          <Image src={githubLogo} alt="GitHub" width={30} height={30} />
        </Link>
      </div>
    </main>
  );
}
