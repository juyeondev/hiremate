'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import alexProfile from '@/resources/icons/alex_profile.png';
import Header from '../_components/Header';
import LobbyCharacter from '../_components/LobbyCharacter';
import SpeechBubble from '../_components/SpeechBubble';

type Step = 'greeting1' | 'greeting2' | 'jobInput' | 'characterIntro' | 'characterSelect' | 'readyToInterview';

const BUBBLE_STEPS: Step[] = ['greeting1', 'greeting2', 'characterIntro', 'readyToInterview'];
const CLICK_TO_ADVANCE: Step[] = ['greeting1', 'greeting2', 'characterIntro', 'readyToInterview'];

const BUBBLE_TEXT: Partial<Record<Step, string>> = {
  greeting1: 'Welcome!\nAre you here for a job interview?',
  greeting2: 'Are you interviewing\nfor which position?',
  characterIntro: 'Who do you have\nan appointment with?',
  readyToInterview: "You're all set!\n\nGood luck with your interview!",
};

export default function Lobby() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('greeting1');
  const [jobTitle, setJobTitle] = useState('');
  const [character, setCharacter] = useState('');
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const bubbleShown = useRef(false);

  useEffect(() => {
    if (!BUBBLE_STEPS.includes(step) || bubbleShown.current) return;
    const timer = setTimeout(() => {
      setBubbleVisible(true);
      bubbleShown.current = true;
    }, 1000);
    return () => clearTimeout(timer);
  }, [step]);

  const handleScreenClick = () => {
    if (!CLICK_TO_ADVANCE.includes(step) || !bubbleVisible) return;
    if (step === 'readyToInterview') {
      router.push(`/interview-room?jobTitle=${encodeURIComponent(jobTitle)}&character=${encodeURIComponent(character)}`);
      return;
    }
    const next: Record<string, Step> = {
      greeting1: 'greeting2',
      greeting2: 'jobInput',
      characterIntro: 'characterSelect',
    };
    setStep(next[step]);
  };

  return (
    <main
      className="min-h-screen bg-background flex flex-col items-center"
      onClick={handleScreenClick}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full">
        <Header />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center w-full px-4">
        {BUBBLE_STEPS.includes(step) && (
          <SpeechBubble
            text={BUBBLE_TEXT[step] ?? ''}
            visible={bubbleVisible}
            onNext={handleScreenClick}
          />
        )}

        {step === 'jobInput' && (
          <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-3 px-4 w-full max-w-xs" style={{ fontFamily: 'var(--font-nunito)' }}>
            <div className="px-4 py-1.5 bg-hm-deep rounded-full">
              <span className="text-white font-bold text-xl">Enter Job Title</span>
            </div>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Job Title"
              className="w-full rounded-2xl border-[5px] bg-white px-4 py-3 text-xl font-bold outline-none"
              style={{ borderColor: 'var(--hm-border)', color: 'var(--hm-deep)' }}
            />
            {/* TODO: If user put invalid job title, show an error message */}
            <button
              onClick={() => setStep('characterIntro')}
              disabled={jobTitle.trim() === ''}
              className="mt-4 px-8 py-1.5 bg-gradient-to-b from-[#FFB84D] to-[#F5A000] text-white font-extrabold text-xl rounded-[10px] hover:brightness-110 transition-all disabled:opacity-40"
            >
              Enter
            </button>
          </div>
        )}

        {step === 'characterSelect' && (
          <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-1 px-4 w-full max-w-xs mt-4" style={{ fontFamily: 'var(--font-nunito)' }}>
            <div className="px-4 py-1.5 bg-hm-deep rounded-full">
              <span className="text-white font-bold text-xl">Select a Character</span>
            </div>
            {/* TODO: Allow other characters than Alex */}
            <button
              onClick={() => { setCharacter('Alex'); setStep('readyToInterview'); }}
              className="flex flex-col items-center gap-1 mt-4 hover:opacity-80 transition-all"
            >
              <div className="bg-white rounded-2xl p-3">
                <Image src={alexProfile} alt="Alex" width={100} height={100} />
              </div>
              <span className="font-extrabold text-2xl" style={{ color: 'var(--hm-deep)' }}>Alex</span>
            </button>
            <p className="text-center text-lg font-bold" style={{ color: 'var(--hm-muted)' }}>He is calm, polite and supportive.</p>
          </div>
        )}
      </div>

      <LobbyCharacter step={step} />
    </main>
  );
}
