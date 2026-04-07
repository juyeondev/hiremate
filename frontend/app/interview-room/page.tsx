'use client';

export const dynamic = 'force-dynamic';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function InterviewRoom() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const jobTitle = searchParams.get('jobTitle');
  const character = searchParams.get('character');

  const [questionList, setQuestionList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<string[]>([]);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate_questions/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ job_title: jobTitle, character: character }),
    })
      .then((response) => response.json())
      .then((json) => {
        setQuestionList(json);
        setIsLoading(false);
      });
  }, []);

  function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const newTranscript = event.results[0][0].transcript;
      setTranscript(newTranscript);
      setIsListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event);
      setIsListening(false);
    };
    
    recognition.start();
    setIsListening(true);

  }

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = transcript;
    setAnswers(newAnswers);

    if (currentIndex < questionList.length - 1) {
      setTranscript('');
      setCurrentIndex(currentIndex + 1);
    } else {
      const interviewData = questionList.map((q, i) => ({ question: q, answer: newAnswers[i] ?? '' }));
      sessionStorage.setItem('interviewSession', JSON.stringify({ jobTitle, interviewData }));
      router.push('/result-room');
    }
  };

  if (isLoading) return <div>Loading Questions...</div>;

  return (
    <div>
      <h1>Interview Room</h1>
      <p>Question {currentIndex + 1} / {questionList.length}</p>
      <p>{questionList[currentIndex]}</p>

      {!transcript && (                                                                                       
        <button onClick={startListening} disabled={isListening}>                                              
          {isListening ? 'Listening...' : 'Start Speaking'}                                                   
        </button>                                                                                             
      )}

      {transcript && (
        <div>
          <p>You said: {transcript}</p>
          <button onClick={() => { setTranscript(''); startListening(); }}>Re-answer</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
}
