"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Extract numeric part for animation
  const numMatch = value.match(/^(\d+)/);
  const num = numMatch ? parseInt(numMatch[1]) : 0;
  const suffix = numMatch ? value.slice(numMatch[1].length) : value;
  const isNumeric = numMatch !== null;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible || !isNumeric) return;
    const duration = 1200;
    const steps = 30;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [visible, num, isNumeric]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl sm:text-5xl font-bold text-teal mb-2">
        {visible ? (isNumeric ? `${count}${suffix}` : value) : <span className="opacity-0">{value}</span>}
      </p>
      <p className="text-white/60 text-sm">{label}</p>
    </div>
  );
}
