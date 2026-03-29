interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  accent?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
  accent = false,
}: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-white border border-gray-100 shadow-sm p-6 ${
        accent ? "border-t-[3px] border-t-teal" : ""
      } ${
        hover
          ? "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
