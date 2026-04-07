'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface InterviewData {
    question: string;
    answer: string;
}

interface ScoreResult {
    total_score: number;
    comment: string;
}

export default function ResultRoom() {
    const router = useRouter();

    // TODO: use zod for runtime validation and type inference instead of manual casting
    const [interviewData, setInterviewData] = useState<InterviewData[]>([]);
    const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const session = JSON.parse(sessionStorage.getItem('interviewSession') || '{}');
        const jobTitle: string = session.jobTitle || '';
        const data: InterviewData[] = session.interviewData || [];
        setInterviewData(data);

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/score_answer/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ job_title: jobTitle, interview_data: data }),
        })
            .then((response) => response.json())
            .then((json) => {
                setScoreResult(json);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, []);

    if (isLoading) return <div>Scoring your interview...</div>;

    return (
        <div>
            <h1>Result Room</h1>
            <p>Score: {scoreResult?.total_score}</p>
            <p>{scoreResult?.comment}</p>
            <hr />
            {interviewData.map((item, index) => (
                <div key={index}>
                    <p><strong>Q:</strong> {item.question}</p>
                    <p><strong>A:</strong> {item.answer}</p>
                </div>
            ))}

            <button onClick={() => router.push('/lobby')}>Restart Interview</button>
            <button onClick={() => router.push('/feedback')}>View Detailed Feedback</button>
        </div>
    );
}
