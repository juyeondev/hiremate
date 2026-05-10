'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import alexProfile from '@/resources/icons/alex_profile.png';

import BadgeLabel from '../_components/BadgeLabel';
import Header from '../_components/Header';
import LobbyCharacter from '../_components/LobbyCharacter';
import PrimaryButton from '../_components/PrimaryButton';
import SpeechBubble from '../_components/SpeechBubble';

type Step =
  | 'greeting1'
  | 'greeting2'
  | 'jobInput'
  | 'characterIntro'
  | 'characterSelect'
  | 'readyToInterview';

interface StepConfig {
  bubble?: string;
  next?: Step;
  expression: 'normal' | 'smile';
}

const STEP_CONFIG: Record<Step, StepConfig> = {
  greeting1: {
    bubble: 'Welcome!\nAre you here for a job interview?',
    next: 'greeting2',
    expression: 'normal',
  },
  greeting2: {
    bubble: 'Which position\nare you interviewing for?',
    next: 'jobInput',
    expression: 'smile',
  },
  jobInput: { next: 'characterIntro', expression: 'smile' },
  characterIntro: {
    bubble: 'Who do you have\nan appointment with?',
    next: 'characterSelect',
    expression: 'normal',
  },
  characterSelect: { expression: 'normal' },
  readyToInterview: {
    bubble: "You're all set!\n\nGood luck with your interview!",
    expression: 'smile',
  },
};

export default function Lobby() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('greeting1');
  const [jobTitle, setJobTitle] = useState('');
  const [character, setCharacter] = useState('');
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const bubbleShown = useRef(false);

  const config = STEP_CONFIG[step];

  useEffect(() => {
    if (!config.bubble || bubbleShown.current) return;
    const timer = setTimeout(() => {
      setBubbleVisible(true);
      bubbleShown.current = true;
    }, 1000);
    return () => clearTimeout(timer);
  }, [step, config.bubble]);

  const handleScreenClick = () => {
    if (!config.bubble || !bubbleVisible) return;
    if (step === 'readyToInterview') {
      router.push(
        `/interview-room?jobTitle=${encodeURIComponent(jobTitle)}&character=${encodeURIComponent(character)}`
      );
      return;
    }
    if (config.next) setStep(config.next);
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
        {config.bubble && (
          <SpeechBubble text={config.bubble} visible={bubbleVisible} onNext={handleScreenClick} />
        )}

        {step === 'jobInput' && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center gap-3 px-4 w-full max-w-xs"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            <BadgeLabel className="self-center">Enter Job Title</BadgeLabel>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Job Title"
              className="w-full rounded-2xl border-[5px] bg-white px-4 py-3 text-xl font-bold outline-none"
              style={{ borderColor: 'var(--hm-border)', color: 'var(--hm-deep)' }}
            />
            {/* TODO: If user put invalid job title, show an error message */}
            <PrimaryButton
              onClick={() => setStep('characterIntro')}
              disabled={jobTitle.trim() === ''}
              className="mt-4 text-xl px-8 py-1.5"
            >
              Enter
            </PrimaryButton>
          </div>
        )}

        {step === 'characterSelect' && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center gap-1 px-4 w-full max-w-xs mt-4"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            <BadgeLabel className="self-center">Select a Character</BadgeLabel>
            {/* TODO: Allow other characters than Alex */}
            <button
              onClick={() => {
                setCharacter('Alex');
                setStep('readyToInterview');
              }}
              className="flex flex-col items-center gap-1 mt-4 hover:opacity-80 transition-all"
            >
              <div className="bg-white rounded-2xl p-3">
                <Image src={alexProfile} alt="Alex" width={100} height={100} />
              </div>
              <span className="font-extrabold text-2xl" style={{ color: 'var(--hm-deep)' }}>
                Alex
              </span>
            </button>
            <p className="text-center text-lg font-bold" style={{ color: 'var(--hm-muted)' }}>
              He is calm, polite, and supportive.
            </p>
          </div>
        )}
      </div>

      <LobbyCharacter expression={config.expression} />
    </main>
  );
}
