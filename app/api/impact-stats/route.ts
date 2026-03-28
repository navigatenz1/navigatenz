import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

let cache: { data: Record<string, number>; ts: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  if (cache && Date.now() - cache.ts < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  try {
    const supabase = createClient();
    const [profiles, assessments, modules] = await Promise.all([
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("assessments").select("id", { count: "exact", head: true }),
      supabase.from("module_progress").select("id", { count: "exact", head: true }).eq("completed", true),
    ]);

    const data = {
      students: profiles.count || 0,
      assessments: assessments.count || 0,
      checkpoints: modules.count || 0,
      guides: 14,
      modules: 12,
      tools: 5,
      scholarships: 20,
      languages: 3,
    };

    cache = { data, ts: Date.now() };
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({
      students: 0, assessments: 0, checkpoints: 0,
      guides: 14, modules: 12, tools: 5, scholarships: 20, languages: 3,
    });
  }
}
