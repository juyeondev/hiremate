'use client';

import { useSearchParams } from 'next/navigation';

export default function InterviewRoom() {
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get('jobTitle');
  const character = searchParams.get('character');

  return (
    <div>
      <h1>Interview Room</h1>
      <p>Job Title: {jobTitle}</p>
      <p>Interviewer: {character}</p>
    </div>
  );
}