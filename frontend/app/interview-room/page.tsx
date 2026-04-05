'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function InterviewRoom() {
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get('jobTitle');
  const character = searchParams.get('character');
  const [questionList, setQuestionList] = useState([]);

 
  useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate_questions/`, {                                                                    
        method: "POST",                                                                                                                    
        headers: { "Content-Type": "application/json" },                                                                                   
        body: JSON.stringify({ job_title: jobTitle, character: character }),
      })
      .then((response) => response.json())
      .then((json) => {
        setQuestionList(json);
      });
  }, []);

  return (
    <div>
      <h1>Interview Room</h1>
      <p>Job Title: {jobTitle}</p>
      <p>Interviewer: {character}</p>
      <ul>
        {questionList.map((q, i) => <li key={i}>{q}</li>)}                                                                                 
      </ul> 
    </div>
  );
}