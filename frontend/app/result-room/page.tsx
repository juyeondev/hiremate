'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Header from '../_components/Header';
import LoadingScreen from '../_components/LoadingScreen';
import QAItem from '../_components/QAItem';
import RestartButton from '../_components/RestartButton';

interface InterviewData {
  question: string;
  answer: string;
}

interface ScoreResult {
  total_score: number;
}

export default function ResultRoom() {
  const router = useRouter();
  const [interviewData, setInterviewData] = useState<InterviewData[]>([]);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = JSON.parse(sessionStorage.getItem('interviewSession') || '{}');
    const jobTitle: string = session.jobTitle || '';
    const data: InterviewData[] = session.interviewData || [];
    setInterviewData(data);

    fetch(`/api/score_answer/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ job_title: jobTitle, interview_data: data }),
    })
      .then((res) => res.json())
      .then((json) => {
        setScoreResult(json);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingScreen text="Scoring your interview..." />;

  return (
    <main className="min-h-screen bg-background flex flex-col items-center">
      <Header />

      {/* Score section */}
      <div
        className="flex flex-col items-center mt-6 mb-5"
        style={{ fontFamily: 'var(--font-nunito)', color: 'var(--hm-deep)' }}
      >
        <p className="font-extrabold text-2xl mb-1">The result is...</p>
        <div className="flex items-end gap-2">
          <span className="font-extrabold text-7xl leading-none">{scoreResult?.total_score}</span>
          <span className="font-extrabold text-3xl mb-1">/ 100</span>
        </div>
      </div>

      {/* Q&A scroll card */}
      <div
        className="w-[calc(100%-2rem)] max-w-lg rounded-2xl border-2 overflow-hidden"
        style={{ borderColor: 'var(--hm-qa)', backgroundColor: 'var(--hm-answer-bg)' }}
      >
        <div
          className="px-5 py-4 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[var(--hm-scroll-track)] [&::-webkit-scrollbar-thumb]:bg-[var(--hm-scroll-thumb)] [&::-webkit-scrollbar-thumb]:rounded-full"
          style={{ maxHeight: '50vh', fontFamily: 'var(--font-nunito)' }}
        >
          {interviewData.map((item, index) => (
            <div key={index} className="mb-5 last:mb-0">
              <QAItem question={item.question} answer={item.answer} />
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div
        className="w-full max-w-sm px-4 flex flex-col gap-3 mt-6"
        style={{ fontFamily: 'var(--font-nunito)' }}
      >
        <button
          onClick={() => router.push('/feedback')}
          className="w-full py-3 rounded-xl font-extrabold text-2xl text-white bg-gradient-to-b from-[#87B0FF] to-[#6D9EFF] hover:brightness-110 transition-all"
        >
          Get Feedback
        </button>
        <RestartButton />
      </div>
    </main>
  );
}
