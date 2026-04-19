import { useEffect, useState } from 'react';

interface SpeechBubbleProps {
  text: string;
  visible: boolean;
  onNext: () => void;
}

export default function SpeechBubble({ text, visible, onNext }: SpeechBubbleProps) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!visible) {
      setDisplayText('');
      return;
    }
    setDisplayText('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayText(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [visible, text]);

  return (
    <div
      className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'} w-full sm:max-w-xs mx-auto rounded-2xl border-[5px] bg-white p-5 relative`}
      style={{ fontFamily: 'var(--font-nunito)', borderColor: 'var(--hm-border)' }}
    >
      <p
        className="font-bold text-2xl leading-snug whitespace-pre-line"
        style={{ color: 'var(--hm-deep)' }}
      >
        {displayText}
      </p>
      <button
        onClick={onNext}
        className="absolute bottom-3 right-4 text-lg animate-pulse"
        style={{ color: 'var(--hm-border)' }}
      >
        ▶
      </button>
    </div>
  );
}
