"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function DeleteProductButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    if (!confirm("คุณแน่ใจว่าต้องการลบสินค้านี้หรือไม่?")) return;
    setLoading(true);
    const { error } = await supabase.from("products").delete().eq("id", productId);
    setLoading(false);
    if (error) {
      alert("ลบไม่สำเร็จ: " + error.message);
    } else {
      router.refresh(); // refresh server component
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? "กำลังลบ..." : "ลบ"}
    </Button>
  );
}
