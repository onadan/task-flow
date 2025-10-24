import { supabaseAnonKey, supabaseUrl } from "@/config/env";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
