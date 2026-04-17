"use client";

import React, { useState } from "react";
import Link from "next/link";
import FallbackImage from "@/components/FallbackImage";
import { useI18n } from "@/lib/i18n";

// Each accordion image must be unique and must NOT match any image used on /guides.
// TODO(images): re-verify these five photos render correctly; swap if any are dead.
const accordionItems = [
  {
    id: 1,
    title: "Understand the System",
    subtitle: "Schools, NCEA, zoning explained",
    imageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&q=80",
    imageAlt: "Students walking into a modern university library",
    link: "/guides",
  },
  {
    id: 2,
    title: "Find Your Path",
    subtitle: "Personalised assessment",
    imageUrl: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&q=80",
    imageAlt: "Focused student working through a self-assessment at their desk",
    link: "/assessment",
  },
  {
    id: 3,
    title: "Track Progress",
    subtitle: "Action modules & checklists",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    imageAlt: "Group of students collaborating in a bright NZ classroom",
    link: "/modules",
  },
  {
    id: 4,
    title: "Use Free Tools",
    subtitle: "Credit calculator, scholarships & more",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
    imageAlt: "Two students comparing notes and planning next steps",
    link: "/tools",
  },
  {
    id: 5,
    title: "Get Into University",
    subtitle: "Applications, funding, everything",
    imageUrl: "https://images.unsplash.com/photo-1627556704302-624286467c65?w=1200&q=80",
    imageAlt: "University graduate celebrating after receiving their degree",
    link: "/guides/how-to-get-into-university",
  },
];

function AccordionItem({
  item,
  isActive,
  onMouseEnter,
}: {
  item: (typeof accordionItems)[0];
  isActive: boolean;
  onMouseEnter: () => void;
}) {
  return (
    <Link
      href={item.link}
      className={`relative h-[420px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out flex-shrink-0 ${
        isActive ? "flex-[4]" : "flex-[0.6]"
      }`}
      onMouseEnter={onMouseEnter}
    >
      <FallbackImage
        src={item.imageUrl}
        alt={item.imageAlt}
        width={800}
        height={420}
        fill
        className="object-cover"
      />
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isActive
            ? "bg-gradient-to-t from-[#1B2A4A]/80 via-[#1B2A4A]/20 to-transparent"
            : "bg-[#1B2A4A]/50"
        }`}
      />

      {/* Active content */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <p className="text-white/70 text-sm font-medium mb-1">{item.subtitle}</p>
        <h3 className="text-white text-xl font-bold">{item.title}</h3>
      </div>

      {/* Collapsed label */}
      <span
        className={`absolute text-white text-sm font-semibold whitespace-nowrap transition-all duration-300 ease-in-out ${
          isActive
            ? "opacity-0"
            : "bottom-24 left-1/2 -translate-x-1/2 rotate-90 opacity-100"
        }`}
      >
        {item.title}
      </span>
    </Link>
  );
}

export function HeroAccordion() {
  const [activeIndex, setActiveIndex] = useState(1);
  const { t } = useI18n();

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
      {/* Text side */}
      <div className="w-full lg:w-[45%] text-center lg:text-left">
        <div className="inline-block px-4 py-1.5 rounded-full bg-teal/10 text-teal text-sm font-medium mb-6">
          {t.hero.badge}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy leading-[1.1] tracking-tight">
          {t.hero.headline1}{" "}
          <span className="text-teal">{t.hero.headline2}</span>
        </h1>
        <p className="mt-6 text-lg text-navy/60 max-w-xl mx-auto lg:mx-0 leading-relaxed">
          {t.hero.subheadline}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link
            href="/assessment"
            className="inline-flex items-center justify-center bg-teal text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-teal/20 hover:bg-teal-600 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-center"
          >
            {t.hero.cta2}
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center justify-center bg-white text-navy font-semibold px-8 py-3.5 rounded-xl border-2 border-navy/10 hover:border-teal hover:text-teal hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-center"
          >
            {t.hero.cta1}
          </Link>
        </div>
      </div>

      {/* Accordion side */}
      <div className="w-full lg:w-[55%]">
        {/* Desktop accordion */}
        <div className="hidden lg:flex flex-row items-center justify-center gap-3">
          {accordionItems.map((item, index) => (
            <AccordionItem
              key={item.id}
              item={item}
              isActive={index === activeIndex}
              onMouseEnter={() => setActiveIndex(index)}
            />
          ))}
        </div>
        {/* Mobile: single featured image — distinct from accordion panels and guide images. */}
        {/* TODO(images): verify this photo renders; swap if broken. */}
        <div className="lg:hidden relative h-[300px] rounded-2xl overflow-hidden shadow-xl shadow-navy/10">
          <FallbackImage
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80"
            alt="New Zealand university students on campus on a sunny day"
            width={1200}
            height={600}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/70 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-white/80 text-sm">Built for families navigating NZ education for the first time</p>
            <p className="text-white text-lg font-bold">Find your path to university</p>
          </div>
        </div>
      </div>
    </div>
  );
}
