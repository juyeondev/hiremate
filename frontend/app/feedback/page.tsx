'use client';
import { useEffect, useState } from 'react';

import Header from '../_components/Header';
import LoadingScreen from '../_components/LoadingScreen';
import QAItem from '../_components/QAItem';
import RestartButton from '../_components/RestartButton';

interface FeedBackResult {
  question: string;
  answer: string;
  feedback: string;
}

export default function Feedback() {
  // TODO: use zod for runtime validation and type inference instead of manual casting
  // TODO: null check feedBackResult before rendering
  const [feedBackResult, setFeedBackResult] = useState<FeedBackResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    const session = JSON.parse(sessionStorage.getItem('interviewSession') || '{}');
    const title: string = session.jobTitle || '';
    const interviewData = session.interviewData || [];
    setJobTitle(title);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ job_title: title, interview_data: interviewData }),
    })
      .then((response) => response.json())
      .then((json) => {
        setFeedBackResult(json);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingScreen text="Preparing your feedback..." />;

  return (
    <main className="min-h-screen bg-background flex flex-col items-center">
      <Header />

      {/* Title section */}
      <div
        className="flex flex-col items-center mt-6 mb-5"
        style={{ fontFamily: 'var(--font-nunito)', color: 'var(--hm-deep)' }}
      >
        <p className="font-extrabold text-2xl mb-1">Here&apos;s your feedback</p>
        <p className="font-bold text-xl" style={{ color: 'var(--hm-muted)' }}>
          {jobTitle}
        </p>
      </div>

      {/* Feedback scroll card */}
      <div
        className="w-[calc(100%-2rem)] max-w-lg rounded-2xl border-2 overflow-hidden"
        style={{ borderColor: 'var(--hm-qa)', backgroundColor: 'var(--hm-answer-bg)' }}
      >
        <div
          className="px-5 py-4 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[var(--hm-scroll-track)] [&::-webkit-scrollbar-thumb]:bg-[var(--hm-scroll-thumb)] [&::-webkit-scrollbar-thumb]:rounded-full"
          style={{ maxHeight: '58vh', fontFamily: 'var(--font-nunito)' }}
        >
          {feedBackResult.map((item, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <QAItem question={item.question} answer={item.answer} />
              <div
                className="rounded-xl px-4 py-3 bg-white mt-3"
                style={{ border: '2px solid var(--hm-soft)' }}
              >
                <p
                  className="font-extrabold text-sm uppercase tracking-wider mb-1"
                  style={{ color: 'var(--hm-blue)' }}
                >
                  Feedback
                </p>
                <p className="font-bold text-lg" style={{ color: 'var(--hm-deep)' }}>
                  {item.feedback}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div
        className="w-full max-w-sm px-4 flex flex-col gap-3 mt-6 mb-8"
        style={{ fontFamily: 'var(--font-nunito)' }}
      >
        <RestartButton />
      </div>
    </main>
  );
}
