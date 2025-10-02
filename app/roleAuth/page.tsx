import { redirect } from "next/navigation";
import { getUserWithRole } from "@/lib/supabase/utils";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/app-layout";

export default async function RoleAuthPage() {
  const { user, role } = await getUserWithRole();
  if (!user) redirect("/auth/login");
  if (role) redirect("/dashboard"); // already has role

  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">เลือกบทบาทของคุณ</h1>
        <div className="flex gap-4">
          <Button asChild>
            <a href="/register/volunteer">จิตอาสา</a>
          </Button>
          <Button asChild variant="secondary">
            <a href="/register/broker">โบรกเกอร์</a>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
