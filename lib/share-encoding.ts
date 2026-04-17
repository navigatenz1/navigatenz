// Tiny base64url round-trip for share payloads.
// Only encode aggregate choices — NEVER names, emails, or anything sensitive.

function toBase64Url(s: string) {
  if (typeof window === "undefined") {
    return Buffer.from(s, "utf-8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(s: string) {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b64 = (s + pad).replace(/-/g, "+").replace(/_/g, "/");
  if (typeof window === "undefined") {
    return Buffer.from(b64, "base64").toString("utf-8");
  }
  return decodeURIComponent(escape(atob(b64)));
}

export function encodePayload<T>(data: T): string {
  return toBase64Url(JSON.stringify(data));
}

export function decodePayload<T>(encoded: string): T | null {
  try {
    return JSON.parse(fromBase64Url(encoded)) as T;
  } catch {
    return null;
  }
}
