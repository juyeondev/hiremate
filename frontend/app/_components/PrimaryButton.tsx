import Link from 'next/link';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  className?: string;
}

const BASE_CLASS =
  'px-10 py-2 bg-gradient-to-b from-[#FFB84D] to-[#F5A000] text-white font-extrabold text-2xl rounded-[10px] hover:brightness-110 transition-all disabled:opacity-40';

export default function PrimaryButton({
  children,
  onClick,
  disabled,
  href,
  className = '',
}: PrimaryButtonProps) {
  const combined = `${BASE_CLASS} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combined} style={{ fontFamily: 'var(--font-nunito)' }}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={combined}
      style={{ fontFamily: 'var(--font-nunito)' }}
    >
      {children}
    </button>
  );
}
