// backend/utils/cache.js
import supabase from "./supabaseClient.js";

export async function getCachedResponse(key) {
  const { data, error } = await supabase
    .from("cache")
    .select("value, expires_at")
    .eq("key", key)
    .single();

  if (error || !data) return null;

  const now = new Date();
  if (new Date(data.expires_at) < now) return null;

  return data.value;
}

export async function setCachedResponse(key, value, ttlSeconds = 3600) {
  const expires_at = new Date(Date.now() + ttlSeconds * 1000).toISOString();
  const { error } = await supabase.from("cache").upsert({
    key,
    value,
    expires_at,
  });
  if (error) console.error("Cache upsert error:", error);
}
