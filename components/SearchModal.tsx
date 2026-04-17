"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search as SearchIcon, X, BookOpen, Wrench, CheckSquare, FileText } from "lucide-react";
import { searchIndex, type SearchItem, type SearchResultType } from "@/lib/search-index";

interface Props {
  open: boolean;
  onClose: () => void;
}

const typeIcon: Record<SearchResultType, typeof BookOpen> = {
  guide: BookOpen,
  tool: Wrench,
  module: CheckSquare,
  page: FileText,
};

const typeLabel: Record<SearchResultType, string> = {
  guide: "Guide",
  tool: "Tool",
  module: "Module",
  page: "Page",
};

export default function SearchModal({ open, onClose }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: [
          { name: "title", weight: 0.6 },
          { name: "description", weight: 0.3 },
          { name: "tags", weight: 0.3 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    []
  );

  const results = useMemo<SearchItem[]>(() => {
    if (!query.trim()) return searchIndex.slice(0, 8);
    return fuse.search(query).slice(0, 12).map((r) => r.item);
  }, [query, fuse]);

  // Reset state when opening
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      // Focus input on next tick so layout settles first
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Keyboard handling
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        const r = results[activeIndex];
        if (r) {
          e.preventDefault();
          router.push(r.href);
          onClose();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, results, activeIndex, router]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Navigate NZ"
      className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[10vh] sm:pt-[15vh]"
    >
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-navy/40 backdrop-blur-sm animate-fade-in"
      />
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
          <SearchIcon size={18} className="text-navy/40 flex-shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
            placeholder="Search guides, tools, modules…"
            aria-label="Search"
            aria-controls="search-results"
            aria-autocomplete="list"
            className="flex-1 text-sm text-navy placeholder:text-navy/40 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-navy/50 hover:bg-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
        <ul
          id="search-results"
          role="listbox"
          aria-label="Search results"
          className="max-h-[60vh] overflow-y-auto p-2"
        >
          {results.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-navy/50">No matches. Try different words.</li>
          ) : (
            results.map((r, i) => {
              const Icon = typeIcon[r.type];
              const isActive = i === activeIndex;
              return (
                <li key={r.href} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => { router.push(r.href); onClose(); }}
                    className={`w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                      isActive ? "bg-soft" : "hover:bg-soft"
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.75} className="text-teal flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-navy text-sm truncate">{r.title}</p>
                        <span className="text-[9px] font-semibold text-navy/40 uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-gray-100">
                          {typeLabel[r.type]}
                        </span>
                      </div>
                      <p className="text-xs text-navy/50 truncate mt-0.5">{r.description}</p>
                    </div>
                  </button>
                </li>
              );
            })
          )}
        </ul>
        <div className="flex items-center justify-between text-[10px] text-navy/40 px-4 py-2 border-t border-gray-100 bg-soft/60">
          <span>↑↓ navigate · Enter select · Esc close</span>
          <span>{results.length} result{results.length !== 1 && "s"}</span>
        </div>
      </div>
    </div>
  );
}
