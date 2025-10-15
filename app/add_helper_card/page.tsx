"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function AddElderPage() {
  const [taskType, setTaskType] = useState<"โพสต์สินค้า" | "แพ็คของ">("โพสต์สินค้า");

  // Common fields
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  // Post Product
  const [productDescriptions, setProductDescriptions] = useState<string[]>([""]);

  // Pack Product
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productPrice, setProductPrice] = useState("");
  const [marketShare, setMarketShare] = useState("");
  const [productDetail, setProductDetail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw userError || new Error("Not authenticated");

      // Upload avatar
      let avatar_url: string | null = null;
      if (avatarFile) {
        const ext = avatarFile.name.split(".").pop();
        const avatarPath = `elders/${user.id}/avatar-${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("elder-assets")
          .upload(avatarPath, avatarFile);
        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("elder-assets").getPublicUrl(avatarPath);
        avatar_url = publicUrl;
      }

      // Upload product image if task = แพ็คของ
      let product_image_url: string | null = null;
      if (taskType === "แพ็คของ" && productImage) {
        const ext = productImage.name.split(".").pop();
        const imgPath = `elders/${user.id}/product-${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("elder-assets")
          .upload(imgPath, productImage);
        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("elder-assets").getPublicUrl(imgPath);
        product_image_url = publicUrl;
      }

      // Insert into Supabase
      const insertData =
        taskType === "โพสต์สินค้า"
          ? {
              volunteer_id: user.id,
              task_type: "โพสต์สินค้า",
              avatar_url,
              name,
              phone,
              location,
              product_descriptions: productDescriptions.filter(Boolean),
            }
          : {
              volunteer_id: user.id,
              task_type: "แพ็คของ",
              avatar_url,
              name,
              phone,
              location,
              product_name: productName,
              product_image: product_image_url,
              product_price: productPrice ? Number(productPrice) : null,
              market_share: marketShare ? Number(marketShare) : null,
              product_descriptions: productDetail ? [productDetail] : [],
            };

      const { error: insertError } = await supabase.from("elder_cards").insert(insertData);
      if (insertError) throw insertError;

      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-xl font-semibold mb-4">เพิ่มผู้สูงอายุ</h1>

        {/* Task Type Selector */}
        <div className="flex justify-between mb-6">
          {["โพสต์สินค้า", "แพ็คของ"].map((t) => (
            <Button
              key={t}
              type="button"
              onClick={() => setTaskType(t as any)}
              className={`flex-1 mx-1 ${
                taskType === t
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t}
            </Button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Common Fields */}
          <div>
            <Label htmlFor="avatar">อัปโหลดรูปโปรไฟล์</Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
            />
          </div>

          <div>
            <Label htmlFor="name">ชื่อ</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="location">ที่อยู่ / พื้นที่</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          {/* Conditional Fields */}
          {taskType === "โพสต์สินค้า" && (
            <div>
              <Label>รายละเอียดสินค้า (หลายรายการ)</Label>
              {productDescriptions.map((desc, i) => (
                <div key={i} className="flex gap-2 mt-2">
                  <Input
                    value={desc}
                    placeholder={`รายละเอียดที่ ${i + 1}`}
                    onChange={(e) => {
                      const newDescs = [...productDescriptions];
                      newDescs[i] = e.target.value;
                      setProductDescriptions(newDescs);
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setProductDescriptions((prev) => prev.filter((_, idx) => idx !== i))
                    }
                  >
                    ลบ
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="mt-2 w-full"
                onClick={() => setProductDescriptions((prev) => [...prev, ""])}
              >
                + เพิ่มรายละเอียด
              </Button>
            </div>
          )}

          {taskType === "แพ็คของ" && (
            <>
              <div>
                <Label htmlFor="productImage">อัปโหลดรูปสินค้า</Label>
                <Input
                  id="productImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProductImage(e.target.files?.[0] || null)}
                />
              </div>

              <div>
                <Label htmlFor="productName">ชื่อสินค้า</Label>
                <Input
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="productPrice">ราคา (บาท)</Label>
                <Input
                  id="productPrice"
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="marketShare">ส่วนแบ่งตลาด (%)</Label>
                <Input
                  id="marketShare"
                  type="number"
                  value={marketShare}
                  onChange={(e) => setMarketShare(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="productDetail">รายละเอียดสินค้า</Label>
                <Input
                  id="productDetail"
                  value={productDetail}
                  onChange={(e) => setProductDetail(e.target.value)}
                />
              </div>
            </>
          )}

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isLoading ? "กำลังบันทึก..." : "เพิ่มข้อมูล"}
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}
