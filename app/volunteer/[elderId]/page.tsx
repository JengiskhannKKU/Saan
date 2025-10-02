import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/app-layout";

export default async function ElderDetail({
  params,
}: {
  params: { elderId: string };
}) {
  const supabase = await createClient();
  const { data: elder } = await supabase
    .from("elders")
    .select("*")
    .eq("id", params.elderId)
    .single();

  if (!elder) return notFound();

  return (
    <AppLayout>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
            {elder.avatar_url ? (
              <Image
                src={elder.avatar_url}
                alt={elder.first_name}
                width={80}
                height={80}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
                👤
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {elder.first_name} {elder.last_name}
            </h1>
            {elder.age && <p className="text-gray-500">อายุ {elder.age}</p>}
          </div>
        </div>

        {/* Tabs / future sections */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <h2 className="font-semibold mb-2">รายละเอียดสินค้า</h2>
          <p className="text-sm text-gray-500">ยังไม่มีสินค้า</p>
        </div>

        <Button className="w-full bg-green-600 hover:bg-green-700">
          เพิ่มสินค้า
        </Button>
      </div>
    </AppLayout>
  );
}
