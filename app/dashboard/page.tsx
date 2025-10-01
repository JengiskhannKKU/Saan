import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, ShoppingBag, Heart, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { AppLayout } from "@/components/layout/app-layout";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth/login");
  }

  const menuItems = [
    { icon: User, label: "โปรไฟล์", href: "/profile", color: "text-blue-600" },
    {
      icon: ShoppingBag,
      label: "คำสั่งซื้อ",
      href: "/orders",
      color: "text-green-600",
    },
    {
      icon: Heart,
      label: "รายการโปรด",
      href: "/favorites",
      color: "text-red-600",
    },
    {
      icon: Settings,
      label: "ตั้งค่า",
      href: "/settings",
      color: "text-gray-600",
    },
  ];

  const recentOrders = [
    {
      id: "ORD001",
      item: "กระถางดิน",
      price: "฿159",
      status: "กำลังจัดส่ง",
      date: "15 ม.ค. 2025",
    },
    {
      id: "ORD002",
      item: "ชุดชาไม้",
      price: "฿169",
      status: "สำเร็จ",
      date: "12 ม.ค. 2025",
    },
    {
      id: "ORD003",
      item: "ผ้าทอมือลายไทย",
      price: "฿459",
      status: "รอการชำระ",
      date: "10 ม.ค. 2025",
    },
  ];

  const handleSignOut = async () => {
    "use server";
    const supabase = createClient();
    await (await supabase).auth.signOut();
    redirect("/auth/login");
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="p-4">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              สวัสดี,{" "}
              {user.user_metadata?.first_name || user.email?.split("@")[0]}!
            </h1>
            <p className="text-gray-600">ยินดีต้อนรับสู่แดชบอร์ดของคุณ</p>
          </div>

          {/* User Info Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {user.user_metadata?.first_name}{" "}
                    {user.user_metadata?.last_name}
                  </h3>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                  <p className="text-gray-500 text-xs">
                    สมาชิกตั้งแต่:{" "}
                    {new Date(user.created_at).toLocaleDateString("th-TH")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Menu Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {menuItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <item.icon
                      className={`w-8 h-8 mx-auto mb-3 ${item.color}`}
                    />
                    <p className="font-medium text-gray-800">{item.label}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Recent Orders */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">
                  คำสั่งซื้อล่าสุด
                </h3>
                <Link href="/orders">
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    ดูทั้งหมด
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{order.item}</p>
                      <p className="text-sm text-gray-600">
                        #{order.id} • {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        {order.price}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === "สำเร็จ"
                            ? "bg-green-100 text-green-800"
                            : order.status === "กำลังจัดส่ง"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </AppLayout>
  );
}
