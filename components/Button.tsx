import Link from "next/link";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

const variants = {
  primary: "bg-teal text-white hover:bg-teal-600 active:scale-[0.98]",
  secondary: "bg-navy text-white hover:bg-navy-600 active:scale-[0.98]",
  outline: "border border-gray-200 text-navy hover:border-teal hover:text-teal active:scale-[0.98]",
  ghost: "text-navy/60 hover:text-navy hover:bg-gray-50",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
