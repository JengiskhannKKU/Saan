// app/volunteer/[elderId]/page.tsx
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeleteProductButton from "./_components/delete-product-button";
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

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("elder_id", params.elderId)
    .order("created_at", { ascending: false });

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Elder header */}
        <div className="flex items-center gap-4">
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

        {/* Products */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold mb-3">สินค้าของผู้สูงอายุ</h2>
          {products && products.length > 0 ? (
            <div className="space-y-3">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 border-b last:border-0 py-2"
                >
                  <div className="w-16 h-16 rounded bg-gray-200 overflow-hidden">
                    {p.image_url ? (
                      <Image
                        src={p.image_url}
                        alt={p.name}
                        width={64}
                        height={64}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        📦
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{p.name}</p>
                    {p.price && (
                      <p className="text-sm text-gray-600">{p.price} ฿</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/broker/${elder.id}/edit-product/${p.id}`}>
                      <Button variant="outline" size="sm">
                        แก้ไข
                      </Button>
                    </Link>
                    <DeleteProductButton productId={p.id} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">ยังไม่มีสินค้า</p>
          )}
        </div>

        <Link href={`/broker/${elder.id}/add-product`}>
          <Button className="w-full bg-green-600 hover:bg-green-700">
            เพิ่มสินค้า
          </Button>
        </Link>
      </div>
    </AppLayout>
  );
}
