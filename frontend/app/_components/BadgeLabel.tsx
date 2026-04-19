interface BadgeLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function BadgeLabel({ children, className = 'self-start' }: BadgeLabelProps) {
  return (
    <div className={`${className} px-4 py-1.5 bg-hm-deep rounded-full`}>
      <span className="text-white font-bold text-xl" style={{ fontFamily: 'var(--font-nunito)' }}>
        {children}
      </span>
    </div>
  );
}
