import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AppLayout } from "@/components/layout/app-layout";

export default async function BrokerDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div className="p-6 text-center">กรุณาเข้าสู่ระบบ</div>;
  }

  // fetch elders owned by this broker
  const { data: elders } = await supabase
    .from("elders")
    .select("*")
    .eq("volunteer_id", user.id); // brokers also stored in volunteer_id field

  return (
    <AppLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">แดชบอร์ดผู้ค้าคนกลาง (Broker)</h1>
          <Link href="/broker/add-elder">
            <Button className="bg-green-600 hover:bg-green-700 text-white">เพิ่มผู้สูงอายุ</Button>
          </Link>
        </div>

        {elders && elders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {elders.map((elder) => (
              <div key={elder.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                    {elder.avatar_url ? (
                      <Image src={elder.avatar_url} alt={elder.first_name} width={64} height={64} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">👤</div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{elder.first_name} {elder.last_name}</p>
                    {elder.age && <p className="text-sm text-gray-500">อายุ {elder.age}</p>}
                  </div>
                </div>
                <Link href={`/broker/${elder.id}`}>
                  <Button variant="outline" size="sm">จัดการ</Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">ยังไม่มีผู้สูงอายุ</p>
        )}
      </div>
    </AppLayout>
  );
}
