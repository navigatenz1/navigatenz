"use client";

import { useI18n } from "@/lib/i18n";
import Container from "./Container";

export default function GuideBanner() {
  const { t } = useI18n();
  return (
    <div className="bg-teal-50 border-b border-teal-100">
      <Container className="py-2.5">
        <p className="text-center text-teal-700 text-xs font-medium">
          📚 {t.guideBanner}
        </p>
      </Container>
    </div>
  );
}
