'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface FeedBackResult {
    question: string;
    answer: string;
    feedback: string;
}

export default function Feedback() {
    const router = useRouter();
    // TODO: use zod for runtime validation and type inference instead of manual casting 
    const session = JSON.parse(sessionStorage.getItem('interviewSession') || '{}');                         
    const jobTitle: string = session.jobTitle || '';                                                        
    const interviewData = session.interviewData || [];  
    
    // TODO: null check feedBackResult before rendering
    const [feedBackResult, setFeedBackResult] = useState<FeedBackResult[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ job_title: jobTitle, interview_data: interviewData }),
        })
            .then((response) => response.json())
            .then((json) => {
                setFeedBackResult(json);
                setIsLoading(false);
            });
    }, []);
    
    return (
        <div>
            <h1>Feedback Page</h1>
            <p>Job Title: {jobTitle}</p>
            {isLoading ? (
                <p>Loading feedback...</p>
            ) : (
                feedBackResult.map((item, index) => (
                    <div key={index}>
                        <p><strong>Q:</strong> {item.question}</p>
                        <p><strong>A:</strong> {item.answer}</p>
                        <p><strong>Feedback:</strong> {item.feedback}</p>
                        <hr />
                    </div>
                ))
            )}
            <button onClick={() => router.push('/')}>Restart Interview</button>
        </div>
    );
}  