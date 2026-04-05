'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Lobby() {
    const router = useRouter();
    const[step, setStep] = useState<'jobInput' | 'characterSelect' | 'readyToInterview'>('jobInput');
    const[jobTitle, setJobTitle] = useState('');

    const isButtonDisabled = jobTitle.trim() === '';
    const lobbyText = () => {
        if (step === 'jobInput') {
            return 'Welcome to the Lobby! Are you interviewing for which position?';
        } else if (step === 'characterSelect') {
            return 'Great! Who do you have an appointment with?';
        } else if (step === 'readyToInterview') {
            return "You're all set! Get ready for your interview!";
        }
    };

  return (
    <main>
        <h1>Lobby</h1>
        <div>{lobbyText()}</div>

        {step === 'jobInput' && (
            <div>
            <h2>Enter Job Title :</h2>
            <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Job Title"
            />
            <button onClick={() => setStep('characterSelect')} disabled={isButtonDisabled}>
                Next
            </button>
            </div>
        )}

        {step === 'characterSelect' && (
            <div>
            <h2>Select the interviewer</h2>
            <button onClick={() => {
                setStep('readyToInterview');
            }}>
                Alex
            </button>
            <p>He is calm, polite, and supportive, but also focused and detail-oriented.</p>
            </div>
        )}

        {step === 'readyToInterview' && (
            <div>
                <button onClick={() => router.push(`/interview-room?jobTitle=${encodeURIComponent(jobTitle)}&character=Alex`)}>{"Let's go!"}</button>
            </div>
        )}
    </main>
  );
}