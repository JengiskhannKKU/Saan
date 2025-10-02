import Link from "next/link";
import { Card, CardContent } from "@mui/material";

interface Elder {
  first_name: string;
  last_name: string;
  avatar_url?: string;
}

interface Product {
  id: string;
  name: string;
  price?: number;
  image_url?: string;
  elders?: Elder;
}

interface ProductCardLinkProps {
  product: Product;
}

export default function ProductCardLink({ product }: ProductCardLinkProps) {
  return (
    <Link key={product.id} href={`/products/${product.id}`} passHref>
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-3">
            {/* Product Image */}
            <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Elder Info */}
            {product.elders && (
              <div className="flex items-center mb-2">
                <img
                  src={product.elders.avatar_url || "/placeholder.svg"}
                  alt={product.elders.first_name}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="text-sm text-gray-600">
                  {product.elders.first_name} {product.elders.last_name}
                </span>
              </div>
            )}

            {/* Product Name */}
            <h3 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="font-bold text-green-600">
                {product.price ? `฿${product.price}` : "—"}
              </span>
            </div>
          </CardContent>
        </Card>
    </Link>
  );
}
