import Image from 'next/image';

import hirematelogo from '@/resources/icons/hiremate_logo.png';
import sparkPurple from '@/resources/icons/spark_purple.png';
import sparkYellow from '@/resources/icons/spark_yellow.png';

export default function LogoWithSparks() {
  return (
    <div className="relative">
      <Image
        src={sparkYellow}
        alt=""
        width={23}
        height={27}
        className="absolute -bottom-5 -left-23"
        style={{ width: '23px', height: 'auto' }}
      />
      <Image
        src={sparkPurple}
        alt=""
        width={23}
        height={27}
        className="absolute -bottom-3 -right-19"
        style={{ width: '23px', height: 'auto' }}
      />
      <Image
        src={sparkYellow}
        alt=""
        width={15}
        height={18}
        className="absolute -bottom-6 -right-23"
        style={{ width: '15px', height: 'auto' }}
      />
      <Image
        src={hirematelogo}
        alt="Hiremate mascot"
        width={120}
        height={120}
        style={{ width: '120px', height: 'auto' }}
      />
    </div>
  );
}
