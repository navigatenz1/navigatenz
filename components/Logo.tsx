import Link from "next/link";

export default function Logo({ size = "default" }: { size?: "default" | "large" }) {
  const iconSize = size === "large" ? 40 : 28;
  const textClass = size === "large" ? "text-2xl" : "text-xl";

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Bold geometric N */}
        <path
          d="M6 34V6h7l14 18V6h7v28h-7L13 16v18H6z"
          fill="#2A9D8F"
        />
        {/* Coral-red origin dot at bottom-left */}
        <circle cx="8" cy="36" r="3" fill="#E85D4A" />
        {/* Gold 4-point sparkle at top-right destination */}
        <path
          d="M34 2l1.5 3.5L39 7l-3.5 1.5L34 12l-1.5-3.5L29 7l3.5-1.5z"
          fill="#E9C46A"
        />
      </svg>
      <span className={`font-semibold ${textClass} tracking-tight`}>
        <span className="text-navy">Navigate</span>
        <span className="text-teal">NZ</span>
      </span>
    </Link>
  );
}
