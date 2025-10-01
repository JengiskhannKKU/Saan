import { createClient } from "./server";

export type UserRole = "volunteer" | "broker" | null;

export async function getUserWithRole() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, role: null as UserRole };

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  return { user, role: (data?.role ?? null) as UserRole };
}

export async function setUserRole(role: "volunteer" | "broker") {
  "use server";
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  await supabase.from("profiles").update({ role }).eq("id", user.id);
}
