import { createClient } from "@/lib/supabase/client";
import { Menu, Search, ShoppingCart, User, Heart, ChevronRight, Star, MessageCircle, ShoppingBag } from "lucide-react";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!product) return <p>Product not found</p>;

  const reviews = Array.isArray(product.reviews) ? product.reviews : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button className="p-2"><Menu className="w-6 h-6" /></button>
          <div className="text-xl font-semibold">saan</div>
          <div className="flex items-center gap-3">
            <button className="p-2"><Search className="w-5 h-5" /></button>
            <button className="p-2"><ShoppingCart className="w-5 h-5" /></button>
            <button className="p-2"><User className="w-5 h-5" /></button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {/* Product Images */}
        <div className="relative">
          <img src={product.img} alt={product.name} className="w-full aspect-square object-cover" />
          <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail Images */}
        <div className="flex gap-2 px-4 py-3 overflow-x-auto">
              <img src={product.img} alt={`Product `} className="w-16 h-16 object-cover rounded border border-gray-200" />
        </div>

        {/* Product Info */}
        <div className="px-4 py-4">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="text-right">
              <div className="text-sm text-gray-600">ขายแล้ว {product.soldCount}</div>
              <div className="flex items-center gap-1 text-sm text-pink-600">
                <Heart className="w-4 h-4 fill-pink-600" />
                <span>{product.wishlistCount} แล้ว</span>
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold text-green-600 mb-4">฿{product.price}</div>

          {/* Description */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">รายละเอียด</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Size Selector */}
          <div className="mb-4">
            <button className="w-full flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700">เพิ่มเติม</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Rating */}
          <button className="w-full flex items-center justify-between py-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{product.rating}</span>
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-gray-600">({product.reviewCount})</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* Review */}
          {reviews.length > 0 && (
            <div className="py-4 border-b border-gray-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold mb-1">{reviews[0].user}</div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">{reviews[0].text}</p>
                  <div className="flex gap-2">
                    {reviews[0].images?.map((img, idx) => (
                      <img key={idx} src={img} alt={`Review ${idx + 1}`} className="w-20 h-20 object-cover rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Seller Info */}
          {product.seller && (
            <div className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={product.seller.avatar} alt={product.seller.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-lg">{product.seller.name}</div>
                    <div className="text-sm text-gray-600">รับการสนับสนุน {product.seller.joinedYears}</div>
                  </div>
                </div>
                <button className="px-6 py-2 border-2 border-green-600 text-green-600 rounded-full font-semibold hover:bg-green-50 transition-colors">
                  ติดตาม
                </button>
              </div>
            </div>
          )}

          {/* Seller Products */}
          <div className="flex gap-2 mt-4">
            <div className="flex-1 aspect-square bg-gray-100 rounded-lg"></div>
            <div className="flex-1 aspect-square bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center">
        <button className="flex-1 flex flex-col items-center justify-center py-3 hover:bg-gray-50">
          <MessageCircle className="w-6 h-6 text-gray-600" />
        </button>
        <div className="w-px h-12 bg-gray-200"></div>
        <button className="flex-1 flex flex-col items-center justify-center py-3 hover:bg-gray-50">
          <ShoppingBag className="w-6 h-6 text-gray-600" />
        </button>
        <button className="flex-1 bg-green-600 text-white font-bold py-4 hover:bg-green-700 transition-colors">
          ซื้อ
        </button>
      </div>
    </div>
  );
}
