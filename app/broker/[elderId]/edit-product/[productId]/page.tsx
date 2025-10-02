"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { AppLayout } from "@/components/layout/app-layout";

export default function EditProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useParams();
  const elderId = params?.elderId as string;
  const productId = params?.productId as string;
  const supabase = createClient();

  useEffect(() => {
    const loadProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();
      if (error) setError(error.message);
      if (data) {
        setName(data.name);
        setDescription(data.description || "");
        setPrice(data.price || "");
      }
    };
    loadProduct();
  }, [productId, supabase]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let image_url: string | undefined;

      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const fileName = `${productId}-${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("product-images") // or create 'product-images' bucket
          .upload(fileName, imageFile, { upsert: true });
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
        image_url = data.publicUrl;
      }

      const { error: updateError } = await supabase
        .from("products")
        .update({
          name,
          description,
          price: price ? Number(price) : null,
          ...(image_url ? { image_url } : {}),
        })
        .eq("id", productId);

      if (updateError) throw updateError;

      router.push(`/broker/${elderId}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-xl font-semibold mb-4">แก้ไขสินค้า</h1>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <Label htmlFor="image">เปลี่ยนรูปภาพ (ถ้าต้องการ)</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
            />
          </div>

          <div>
            <Label htmlFor="name">ชื่อสินค้า</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="description">รายละเอียด</Label>
            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div>
            <Label htmlFor="price">ราคา (บาท)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
            {loading ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}
