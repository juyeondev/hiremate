import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface InterviewSession {
  jobTitle: string | null;
  character: string | null;
}

export function useInterview({ jobTitle, character }: InterviewSession) {
  const router = useRouter();

  const [questionList, setQuestionList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<string[]>([]);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    fetch(`/api/generate_questions/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ job_title: jobTitle, character }),
    })
      .then((res) => res.json())
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
      setTranscript(event.results[0][0].transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event);
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);
  }

  function handleNext() {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = transcript;
    setAnswers(newAnswers);

    if (currentIndex < questionList.length - 1) {
      setTranscript('');
      setCurrentIndex(currentIndex + 1);
    } else {
      const interviewData = questionList.map((q, i) => ({
        question: q,
        answer: newAnswers[i] ?? '',
      }));
      sessionStorage.setItem('interviewSession', JSON.stringify({ jobTitle, interviewData }));
      router.push('/result-room');
    }
  }

  return {
    questionList,
    currentIndex,
    isLoading,
    transcript,
    isListening,
    startListening,
    handleNext,
  };
}
