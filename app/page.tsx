"use client"

import { useState, useEffect } from "react"
import { Search, ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

const categories = [
  { id: "pottery", name: "เครื่องปั้นดินเผา", active: true },
  { id: "wood", name: "ไม้", active: false },
  { id: "accessories", name: "เครื่องประดับ", active: false },
  { id: "fabric", name: "ผ้า", active: false },
]

const products = [
  {
    id: 1,
    name: "กระถางดิน",
    price: "฿159",
    image: "/ceramic-pottery-pot.jpg",
    rating: 4.5,
    sold: "ขายแล้ว 50+",
  },
  {
    id: 2,
    name: "ชุดชาไม้",
    price: "฿169",
    image: "/wooden-tea-set.jpg",
    rating: 4.8,
    sold: "ขายแล้ว 30+",
  },
  {
    id: 3,
    name: "ผ้าทอมือลายไทย",
    price: "฿459",
    image: "/thai-handwoven-fabric.jpg",
    rating: 4.7,
    sold: "ขายแล้ว 25+",
  },
  {
    id: 4,
    name: "ชุดจานไม้",
    price: "฿179",
    image: "/wooden-plate-set.jpg",
    rating: 4.6,
    sold: "ขายแล้ว 40+",
  },
]

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("pottery")
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()

    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="text-2xl font-bold text-gray-800" style={{ fontFamily: "serif" }}>
              saan
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {user ? (
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="px-4 py-6">
        <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-xl font-bold mb-2">
              ทุกการช้อปของคุณ
              <br />
              คือพลังสนับสนุนการใช้
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <span className="text-sm">ช้อป saan = 1 บาท</span>
            </div>
            {user ? (
              <Link href="/dashboard">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full">
                  ไปยังแดชบอร์ด
                </Button>
              </Link>
            ) : (
              <Link href="/auth/sign-up">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full">เริ่มต้น</Button>
              </Link>
            )}
          </div>
          <div className="absolute right-4 top-4 opacity-20">
            <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">ประเภทสินค้า</h2>
          <Button variant="ghost" size="sm" className="text-gray-500">
            <span className="mr-1">›</span>
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={category.active ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${
                category.active ? "bg-gray-800 text-white" : "bg-white text-gray-600 border-gray-200"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">สินค้าของเรา</h2>
          <Button variant="ghost" size="sm" className="text-gray-500">
            <span className="mr-1">›</span>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-3">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xs ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.rating})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-green-600">{product.price}</span>
                  <span className="text-xs text-gray-500">{product.sold}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 bg-gray-800 rounded"></div>
            <span className="text-xs text-gray-800">Home</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
            <Search className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Search</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
            <ShoppingCart className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Cart</span>
          </Button>
          {user ? (
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-400">Profile</span>
              </Button>
            </Link>
          ) : (
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-400">Profile</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
