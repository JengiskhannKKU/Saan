"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { AppLayout } from "@/components/layout/app-layout";

export default function AddElderPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw userError || new Error("Not authenticated");

      let avatar_url: string | null = null;

      // ---- Upload avatar if file selected ----
      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("elder-avatars")
          .upload(fileName, avatarFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("elder-avatars").getPublicUrl(fileName);

        avatar_url = publicUrl;
      }

      // ---- Insert elder record ----
      // inside handleSubmit in app/volunteer/add-elder/page.tsx
      const { error: insertError } = await supabase.from("elders").insert({
        first_name: firstName,
        last_name: lastName,
        age: age ? Number(age) : null,
        phone,
        province,
        district,
        subdistrict,
        avatar_url,
      });

      if (insertError) throw insertError;

      router.push("/volunteer");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              เพิ่มผู้สูงอายุ
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Avatar upload */}
              <div className="space-y-2">
                <Label htmlFor="avatar">อัปโหลดรูปภาพ</Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setAvatarFile(e.target.files ? e.target.files[0] : null)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstName">ชื่อ</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">นามสกุล</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">อายุ</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">เบอร์โทร</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province">จังหวัด</Label>
                <Input
                  id="province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">อำเภอ</Label>
                <Input
                  id="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subdistrict">ตำบล</Label>
                <Input
                  id="subdistrict"
                  value={subdistrict}
                  onChange={(e) => setSubdistrict(e.target.value)}
                />
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
              >
                {isLoading ? "กำลังบันทึก..." : "เพิ่มผู้สูงอายุ"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
