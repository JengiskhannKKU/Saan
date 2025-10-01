"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setUser } from "@/lib/redux/slices/auth-slice";

export default function VolunteerRegisterPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
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

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          role: "volunteer",
          full_name: fullName,
          phone,
          province,
          district,
          subdistrict,
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      // Update Redux
      dispatch(
        setUser({
          id: user.id,
          email: user.email!,
          name: fullName,
          role: "volunteer",
        })
      );

      router.push("/volunteer/home");
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาด");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800 mb-2">
            สมัครเป็นจิตอาสา
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            กรอกข้อมูลของคุณเพื่อเข้าร่วมเป็นจิตอาสา
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">ชื่อ-นามสกุล</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">เบอร์โทร</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="province">จังหวัด</Label>
              <Input
                id="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">อำเภอ</Label>
              <Input
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subdistrict">ตำบล</Label>
              <Input
                id="subdistrict"
                value={subdistrict}
                onChange={(e) => setSubdistrict(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
            >
              {isLoading ? "กำลังบันทึก..." : "ยืนยัน"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
