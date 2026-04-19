import Image from 'next/image';

import characterNormal from '@/resources/icons/lobby-character_normal.png';
import characterSmile from '@/resources/icons/lobby-character_smile.png';

interface LobbyCharacterProps {
  step: 'greeting1' | 'greeting2' | 'jobInput' | 'characterIntro' | 'characterSelect' | 'readyToInterview';
}

const SMILE_STEPS = ['greeting2', 'jobInput', 'readyToInterview'];

export default function LobbyCharacter({ step }: LobbyCharacterProps) {
  const src = SMILE_STEPS.includes(step) ? characterSmile : characterNormal;

  return (
    <div className="mt-auto mb-10 flex justify-center">
      <Image src={src} alt="Interviewer" width={300} height={300} />
    </div>
  );
}
