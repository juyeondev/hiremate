interface TitleProps {
  className?: string;
  strokeColor?: string;
}

export default function HiremateTitle({
  className = 'w-64 h-auto -mt-3 -mb-2',
  strokeColor = '#6C9EFF',
}: TitleProps) {
  return (
    <svg
      viewBox="0 0 270 72"
      className={className}
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="135"
        y="58"
        textAnchor="middle"
        fontFamily="var(--font-nunito)"
        fontSize="58"
        fontWeight="900"
        stroke={strokeColor}
        strokeWidth="13"
        strokeLinejoin="round"
        fill="white"
        paintOrder="stroke fill"
      >
        Hiremate
      </text>
    </svg>
  );
}
