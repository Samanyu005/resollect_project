"use client"

import Image, { StaticImageData } from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Plus, Minus } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useState } from "react"

interface ProductProps {
  product: {
    id: number
    name: string
    price: number
    category: string
    rating: number
    image: StaticImageData
    color?: string
    size?: string
    brand?: string
    material?: string
  }
}

export default function ProductCard({ product }: ProductProps) {
  const { addToCart, cart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const isInCart = cart.some((item) => item.id === product.id)

  const handleAddToCart = () => {
    addToCart({
      ...product,
      image: product.image.src,
      quantity,
    })
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 w-full bg-gray-100">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{product.category}</span>
        </div>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm">{product.rating}</span>
          </div>
          <span className="ml-auto font-bold">${product.price.toFixed(2)}</span>
        </div>

        {product.color && <div className="mt-2 text-sm text-gray-600">Color: {product.color}</div>}

        {product.size && <div className="mt-1 text-sm text-gray-600">Size: {product.size}</div>}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {!isInCart ? (
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={decrementQuantity}>
                <Minus className="h-4 w-4" />
              </Button>
              <span>{quantity}</span>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={incrementQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button className="w-full" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        ) : (
          <Button className="w-full" variant="secondary" disabled>
            Added to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

