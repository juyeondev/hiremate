'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import Image from 'next/image';

import alexNormal from '@/resources/icons/alex-normal.png';
import alexSmile from '@/resources/icons/alex-smile.png';
import microphoneIcon from '@/resources/icons/microphone.png';
import Header from '../_components/Header';
import QuestionBox from './QuestionBox';
import { useInterview } from './useInterview';

function InterviewRoomInner() {
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get('jobTitle');
  const character = searchParams.get('character');

  const {
    questionList,
    currentIndex,
    isLoading,
    transcript,
    isListening,
    startListening,
    handleNext,
  } = useInterview({ jobTitle, character });

  const questionLabel = isLoading
    ? 'Question ? / ?'
    : `Question ${currentIndex + 1} / ${questionList.length}`;

  return (
    <main className="min-h-screen bg-background flex flex-col items-center">
      <Header />
      <div className="w-full py-3 flex items-center justify-center">
        <p
          className="font-extrabold text-3xl"
          style={{ fontFamily: 'var(--font-nunito)', color: 'var(--hm-deep)' }}
        >
          {questionLabel}
        </p>
      </div>
      <div className="flex-1 flex flex-col w-full max-w-sm px-4 items-center">
        <div className="bg-white rounded-2xl px-6 pt-6 mt-2 flex items-end justify-center w-full overflow-hidden min-h-40">
          {isLoading ? null /* TODO: replace with loading image */ : (
            <Image
              src={isListening ? alexSmile : alexNormal}
              alt="Alex"
              width={130}
              height={130}
              className="h-auto"
            />
          )}
        </div>
        {!isLoading && (
          <QuestionBox
            question={questionList[currentIndex]}
            transcript={transcript}
            isListening={isListening}
          />
        )}

        {!isLoading && (
          <div className="w-full flex gap-3 mt-4" style={{ fontFamily: 'var(--font-nunito)' }}>
            <button
              onClick={startListening}
              disabled={isListening}
              className="flex-[3] flex items-center justify-center gap-2 rounded-xl border-2 bg-white py-3 font-extrabold text-2xl transition-all hover:brightness-95 disabled:opacity-50"
              style={{ borderColor: 'var(--hm-qa)', color: 'var(--hm-qa)' }}
            >
              <Image src={microphoneIcon} alt="" width={24} height={24} className="h-auto" />
              {isListening ? 'Answering..' : transcript ? 'Re-answer' : 'Answer'}
            </button>
            <button
              onClick={handleNext}
              className="flex-[2] rounded-xl py-3 font-extrabold text-2xl text-white transition-all hover:brightness-110"
              style={{ backgroundColor: 'var(--hm-orange)' }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function InterviewRoom() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InterviewRoomInner />
    </Suspense>
  );
}
