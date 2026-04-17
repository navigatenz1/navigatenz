interface Props {
  percent: number;
  size?: number;
  stroke?: number;
  label?: string;
  subLabel?: string;
}

export default function ProgressRing({ percent, size = 160, stroke = 12, label, subLabel }: Props) {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${clamped} percent ${label ?? "progress"}`}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E6F5F3"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2A9D8F"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl sm:text-4xl font-bold text-navy tabular-nums">{clamped}%</span>
        {subLabel && <span className="text-[10px] text-navy/40 uppercase tracking-wider mt-1">{subLabel}</span>}
      </div>
    </div>
  );
}
