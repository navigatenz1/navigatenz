const uniData: Record<string, { abbr: string; color: string; name: string }> = {
  "University of Auckland": { abbr: "UoA", color: "#00467F", name: "Auckland" },
  "University of Otago": { abbr: "Otago", color: "#002B5C", name: "Otago" },
  "Victoria University of Wellington": { abbr: "Vic", color: "#115740", name: "Victoria" },
  "University of Canterbury": { abbr: "UC", color: "#C8102E", name: "Canterbury" },
  "University of Waikato": { abbr: "Waikato", color: "#D50032", name: "Waikato" },
  "Massey University": { abbr: "Massey", color: "#003DA5", name: "Massey" },
  "AUT": { abbr: "AUT", color: "#E31937", name: "AUT" },
  "Lincoln University": { abbr: "Lincoln", color: "#006838", name: "Lincoln" },
  // Short name aliases
  "Auckland": { abbr: "UoA", color: "#00467F", name: "Auckland" },
  "Otago": { abbr: "Otago", color: "#002B5C", name: "Otago" },
  "Victoria": { abbr: "Vic", color: "#115740", name: "Victoria" },
  "Canterbury": { abbr: "UC", color: "#C8102E", name: "Canterbury" },
  "Waikato": { abbr: "Waikato", color: "#D50032", name: "Waikato" },
  "Massey": { abbr: "Massey", color: "#003DA5", name: "Massey" },
  "Lincoln": { abbr: "Lincoln", color: "#006838", name: "Lincoln" },
};

export default function UniBadge({
  uni,
  size = "sm",
  showName = false,
}: {
  uni: string;
  size?: "sm" | "md";
  showName?: boolean;
}) {
  const data = uniData[uni];
  if (!data) return <span className="text-xs text-navy/50">{uni}</span>;

  const sz = size === "md" ? "w-8 h-8 text-[10px]" : "w-6 h-6 text-[8px]";

  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`${sz} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
        style={{ backgroundColor: data.color }}
        title={uni}
      >
        {data.abbr.slice(0, 3)}
      </span>
      {showName && (
        <span className="text-xs font-medium text-navy">{data.name}</span>
      )}
    </span>
  );
}
