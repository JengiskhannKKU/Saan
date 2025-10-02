"use client";

import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { AppLayout } from "@/components/layout/app-layout";

const categories = [
  { id: "pottery", name: "เครื่องปั้นดินเผา", active: true },
  { id: "wood", name: "ไม้", active: false },
  { id: "accessories", name: "เครื่องประดับ", active: false },
  { id: "fabric", name: "ผ้า", active: false },
];

const featuredProducts = [
  {
    id: 1,
    name: "กระถางดิน",
    price: 159,
    image: "/ceramic-pottery-pot.jpg",
    rating: 4.5,
    category: "แนะนำพิเศษ",
    description: "กระถางดินเผาคุณภาพสูงสำหรับปลูกต้นไม้",
    sold: "ขายแล้ว 50+",
  },
  {
    id: 2,
    name: "ชุดชาไม้",
    price: 169,
    image: "/wooden-tea-set.jpg",
    rating: 4.8,
    category: "ยอดนิยม",
    description: "ชุดชาไม้แกะสลักด้วยมือ สไตล์ไทยดั้งเดิม",
    sold: "ขายแล้ว 30+",
  },
  {
    id: 3,
    name: "ผ้าทอมือลายไทย",
    price: 459,
    image: "/thai-handwoven-fabric.jpg",
    rating: 4.7,
    category: "ใหม่",
    description: "ผ้าทอมือลายไทยดั้งเดิม คุณภาพพรีเมียม",
    sold: "ขายแล้ว 25+",
  },
  {
    id: 4,
    name: "ชุดจานไม้",
    price: 179,
    image: "/wooden-plate-set.jpg",
    rating: 4.6,
    category: "คลาสสิค",
    description: "ชุดจานไม้สำหรับเสิร์ฟอาหารไทย",
    sold: "ขายแล้ว 40+",
  },
];

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
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("pottery");
  const [user, setUser] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [dbProducts, setDbProducts] = useState<any[]>([]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(
      (prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length
    );
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const getProductAtOffset = (offset: number) => {
    const index =
      (currentSlide + offset + featuredProducts.length) %
      featuredProducts.length;
    return featuredProducts[index];
  };

  useEffect(() => {
    const supabase = createClient();

    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase
      .from("products")
      .select("id, name, price, image_url")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setDbProducts(data);
      });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50">
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
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full">
                    เริ่มต้น
                  </Button>
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
            <h2 className="text-lg font-semibold text-gray-800">
              ประเภทสินค้า
            </h2>
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
                  category.active
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-600 border-gray-200"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Products Carousel */}
        <section className="py-8 px-4 bg-gradient-to-b from-green-50 to-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-balance">
                สินค้าที่คุณอาจชอบ
              </h2>
              <p className="text-gray-600 text-pretty">
                สินค้าคัดสรรพิเศษเพื่อคุณโดยเฉพาะ
              </p>
            </div>

            <div className="relative max-w-6xl mx-auto">
              <div className="relative overflow-hidden">
                <div className="flex items-center justify-center gap-8 py-8">
                  {/* Previous Product (Blurred) */}
                  <div className="hidden lg:block w-64 transition-all duration-700 ease-in-out">
                    <div className="relative aspect-square rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                      <Image
                        src={getProductAtOffset(-1).image || "/placeholder.svg"}
                        alt="Previous product"
                        fill
                        className="object-cover transition-all duration-700 ease-in-out blur-sm opacity-60 hover:opacity-80"
                      />
                      <div className="absolute inset-0 bg-black/20 transition-all duration-700 ease-in-out"></div>
                    </div>
                    <div className="text-center mt-4 opacity-60 transition-opacity duration-700">
                      <h4 className="font-medium text-sm text-gray-800">
                        {getProductAtOffset(-1).name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        ฿{getProductAtOffset(-1).price}
                      </p>
                    </div>
                  </div>

                  {/* Current Product (Featured) */}
                  <div className="transition-all duration-700 ease-in-out transform">
                    <Card className="w-80 shadow-2xl border-0 overflow-hidden transform hover:scale-105 transition-transform duration-300 bg-white">
                      <div className="relative aspect-square">
                        <Image
                          src={
                            getProductAtOffset(0).image || "/placeholder.svg"
                          }
                          alt={getProductAtOffset(0).name}
                          fill
                          className="object-cover transition-all duration-700 ease-in-out"
                        />
                        <Badge className="absolute top-4 left-4 bg-green-500 text-white transition-all duration-300">
                          {getProductAtOffset(0).category}
                        </Badge>
                      </div>
                      <CardContent className="p-6 text-center">
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < Math.floor(getProductAtOffset(0).rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="text-sm text-gray-500 ml-1">
                            ({getProductAtOffset(0).rating})
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {getProductAtOffset(0).name}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm">
                          {getProductAtOffset(0).description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-green-600">
                              ฿{getProductAtOffset(0).price}
                            </span>
                            <p className="text-xs text-gray-500">
                              {getProductAtOffset(0).sold}
                            </p>
                          </div>
                          <Button className="bg-black text-white hover:bg-gray-800 transition-colors duration-300">
                            <Plus className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Next Product (Blurred) */}
                  <div className="hidden lg:block w-64 transition-all duration-700 ease-in-out">
                    <div className="relative aspect-square rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                      <Image
                        src={getProductAtOffset(1).image || "/placeholder.svg"}
                        alt="Next product"
                        fill
                        className="object-cover transition-all duration-700 ease-in-out blur-sm opacity-60 hover:opacity-80"
                      />
                      <div className="absolute inset-0 bg-black/20 transition-all duration-700 ease-in-out"></div>
                    </div>
                    <div className="text-center mt-4 opacity-60 transition-opacity duration-700">
                      <h4 className="font-medium text-sm text-gray-800">
                        {getProductAtOffset(1).name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        ฿{getProductAtOffset(1).price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110"
                onClick={prevSlide}
                disabled={isTransitioning}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110"
                onClick={nextSlide}
                disabled={isTransitioning}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {featuredProducts.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                      index === currentSlide
                        ? "bg-green-500 scale-110"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    onClick={() => {
                      if (!isTransitioning) {
                        setIsTransitioning(true);
                        setCurrentSlide(index);
                        setTimeout(() => setIsTransitioning(false), 700);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              สินค้าของเรา
            </h2>
            <Button variant="ghost" size="sm" className="text-gray-500">
              <span className="mr-1">›</span>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <Card
                key={product.id}
                className="bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-3">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xs ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.rating})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-green-600">
                      {product.price}
                    </span>
                    <span className="text-xs text-gray-500">
                      {product.sold}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              สินค้าของเรา
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {dbProducts.map((product) => (
              <Card
                key={product.id}
                className="bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-3">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <img
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-green-600">
                      {product.price ? `฿${product.price}` : "—"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* still show sample products if db empty */}
            {dbProducts.length === 0 && (
              <p className="text-sm text-gray-500 col-span-2 text-center">
                ยังไม่มีสินค้า
              </p>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
