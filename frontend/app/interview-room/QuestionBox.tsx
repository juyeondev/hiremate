interface QuestionBoxProps {
  question: string;
  transcript: string;
  isListening: boolean;
}

function formatTranscript(text: string): string {
  const capitalized = text.charAt(0).toUpperCase() + text.slice(1);
  return /[.!?]$/.test(capitalized) ? capitalized : capitalized + '.';
}

export default function QuestionBox({ question, transcript, isListening }: QuestionBoxProps) {
  const answerText = isListening
    ? 'Listening..'
    : transcript
      ? formatTranscript(transcript)
      : 'Waiting for your answer..';
  const answerColor = isListening || !transcript ? 'var(--hm-answer-muted)' : 'var(--hm-qa)';

  return (
    <div
      className="w-full mt-4 rounded-2xl border-2 overflow-hidden"
      style={{ borderColor: 'var(--hm-qa)', fontFamily: 'var(--font-nunito)' }}
    >
      <div className="bg-white flex items-start gap-2 px-4 py-3">
        <span className="font-extrabold text-2xl shrink-0" style={{ color: 'var(--hm-orange)' }}>
          Q.
        </span>
        <p className="font-bold text-xl" style={{ color: 'var(--hm-deep)' }}>
          {question}
        </p>
      </div>

      <div
        className="flex items-start gap-2 px-4 py-3 h-40 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[var(--hm-scroll-track)] [&::-webkit-scrollbar-thumb]:bg-[var(--hm-scroll-thumb)] [&::-webkit-scrollbar-thumb]:rounded-full"
        style={{ backgroundColor: 'var(--hm-answer-bg)' }}
      >
        <span className="font-extrabold text-2xl shrink-0" style={{ color: 'var(--hm-orange)' }}>
          A.
        </span>
        <p className="font-bold text-xl" style={{ color: answerColor }}>
          {answerText}
        </p>
      </div>
    </div>
  );
}
