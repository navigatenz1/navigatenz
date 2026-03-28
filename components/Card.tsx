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
      className={`rounded-2xl bg-white border border-gray-100 p-6 ${
        accent ? "border-l-4 border-l-teal" : ""
      } ${
        hover
          ? "transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-200/60 hover:bg-gradient-to-br hover:from-white hover:to-teal-50/30"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
