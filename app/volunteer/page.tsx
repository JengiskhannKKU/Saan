"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { AppLayout } from "@/components/layout/app-layout";

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  role: string | null;
}

export default function VolunteerHomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  // Replace families with real elders
  const [elders, setElders] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfileAndElders = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("id, full_name, email, avatar_url, role")
        .eq("id", user.id)
        .single();

      if (!profile?.role) {
        router.push("/roleAuth");
        return;
      }

      setProfile(profile);

      const { data: elderData } = await supabase
        .from("elders")
        .select("*")
        .eq("volunteer_id", user.id)
        .order("created_at", { ascending: false });

      if (elderData) setElders(elderData);
      setLoading(false);
    };

    fetchProfileAndElders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!profile) return null;

  // --- Mock data ---
  const stats = [
    { label: "TASKS", value: "125" },
    { label: "ACHIEVEMENTS", value: "5" },
    { label: "PAYOUT", value: "7.1k ฿" },
    { label: "HELPED", value: "200" },
  ];

  const families = [
    { id: 1, name: "ครอบครัว A", avatar: "/placeholder-avatar.png" },
    { id: 2, name: "ครอบครัว B", avatar: "/placeholder-avatar.png" },
    { id: 3, name: "ครอบครัว C", avatar: "/placeholder-avatar.png" },
  ];

  return (
    <AppLayout>
      {/* Elders */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-800">ครอบครัวที่ฉันดูแล</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/volunteer/add-elder")}
          >
            + เพิ่มผู้สูงอายุ
          </Button>
        </div>

        {elders.length === 0 ? (
          <p className="text-sm text-gray-500">ยังไม่มีผู้สูงอายุ</p>
        ) : (
          <div className="space-y-3">
            {elders.map((elder) => (
              <div
                key={elder.id}
                className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    {elder.avatar_url ? (
                      <Image
                        src={elder.avatar_url}
                        alt={elder.first_name}
                        width={48}
                        height={48}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        👤
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {elder.first_name} {elder.last_name || ""}
                    </p>
                    <p className="text-xs text-gray-500">
                      {elder.age ? `อายุ ${elder.age}` : ""}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => router.push(`/volunteer/${elder.id}`)}
                >
                  Manage
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
