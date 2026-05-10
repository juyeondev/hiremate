interface QAItemProps {
  question: string;
  answer: string;
}

export default function QAItem({ question, answer }: QAItemProps) {
  return (
    <>
      <div className="flex items-start gap-2 mb-1">
        <span className="font-extrabold text-2xl shrink-0" style={{ color: 'var(--hm-orange)' }}>
          Q.
        </span>
        <p className="font-bold text-xl" style={{ color: 'var(--hm-deep)' }}>
          {question}
        </p>
      </div>
      <div className="flex items-start gap-2">
        <span className="font-extrabold text-2xl shrink-0" style={{ color: 'var(--hm-orange)' }}>
          A.
        </span>
        <p className="font-bold text-xl" style={{ color: 'var(--hm-qa)' }}>
          {answer || '—'}
        </p>
      </div>
    </>
  );
}
