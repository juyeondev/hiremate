import Image from 'next/image';

import characterNormal from '@/resources/icons/lobby-character_normal.png';
import characterSmile from '@/resources/icons/lobby-character_smile.png';

interface LobbyCharacterProps {
  expression: 'normal' | 'smile';
}

export default function LobbyCharacter({ expression }: LobbyCharacterProps) {
  const src = expression === 'smile' ? characterSmile : characterNormal;

  return (
    <div className="mt-auto mb-10 flex justify-center">
      <Image src={src} alt="Interviewer" width={300} height={300} />
    </div>
  );
}
