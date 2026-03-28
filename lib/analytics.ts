"use client";

import { createClient } from "@/lib/supabase/client";

export function trackEvent(
  eventType: string,
  eventData: Record<string, unknown> = {},
  pagePath?: string
) {
  try {
    const supabase = createClient();
    supabase.auth.getUser().then((res: { data: { user: { id: string } | null } }) => {
      supabase.from("analytics_events").insert({
        user_id: res.data.user?.id || null,
        event_type: eventType,
        event_data: eventData,
        page_path: pagePath || (typeof window !== "undefined" ? window.location.pathname : null),
      }).then(() => {});
    });
  } catch {
    // Fire and forget — never block UI
  }
}
