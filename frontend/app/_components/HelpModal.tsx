import Image from 'next/image';

import sparkYellow from '@/resources/icons/spark_yellow.png';
import BadgeLabel from './BadgeLabel';
import HiremateTitle from './HiremateTitle';
import PrimaryButton from './PrimaryButton';

interface HelpModalProps {
  onClose: () => void;
}

export default function HelpModal({ onClose }: HelpModalProps) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center px-6 bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-[15px] bg-hm-soft p-6 flex flex-col gap-3"
        style={{ fontFamily: 'var(--font-nunito)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-hm-deep flex items-center justify-center hover:brightness-125 transition-all"
        >
          <span className="text-hm-soft font-bold text-2xl leading-none -translate-y-0.5">x</span>
        </button>

        {/* Header */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <Image src={sparkYellow} alt="" width={20} height={20} />
            <HiremateTitle className="h-12 w-auto" />
            <Image src={sparkYellow} alt="" width={20} height={20} />
          </div>
          <p className="text-hm-deep font-bold text-xl mt-0.5">Practice interviews with AI!</p>
          <div className="w-full border-t-1 border-dashed border-hm-deep mt-1" />
        </div>

        <BadgeLabel>How to practice</BadgeLabel>

        {/* Steps */}
        <div className="flex flex-col pl-3 -mt-2">
          <p className="text-hm-deep font-bold text-xl">
            1. <span className="text-hm-accent">Enter the position</span> you&apos;re applying for!
          </p>
          <p className="text-hm-deep font-bold text-xl">
            2. Answer a few questions with your <span className="text-hm-accent">microphone</span>.
          </p>
          <p className="text-hm-deep font-bold text-xl">
            3. Check your <span className="text-hm-accent">score</span> and{' '}
            <span className="text-hm-accent">feedback</span> too!
          </p>
        </div>

        {/* Motivational text */}
        <p className="text-hm-deep font-bold text-xl leading-snug mt-4">
          Practice until you nail it.
          <br />
          We&apos;re with you until you get your dream job!
        </p>

        <PrimaryButton href="/lobby" className="self-center mt-1">
          Start
        </PrimaryButton>
      </div>
    </div>
  );
}
