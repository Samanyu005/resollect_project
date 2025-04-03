"use client"
import shoe from "./images/shoes image.jpg"
import bottle from "./images/water bottle.jpeg"
import tshirt from "./images/t shirt image.avif"
import watch from "./images/apple watch  image.jpg"
import backpack from "./images/laptop backpack image.jpg"
import headphones from "./images/headphones image.jpg"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, ShoppingCart, Shirt } from "lucide-react"
import ProductCard from "@/components/product-card"
import FilterSidebar from "@/components/filter-sidebar"
import CartSidebar from "@/components/cart-sidebar"
import { useCart } from "@/hooks/use-cart"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const { cart } = useCart()

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Comfortable T-Shirt",
      price: 29.99,
      category: "Clothing",
      rating: 4.5,
      image: tshirt,
      color: "Black",
      size: "M",
    },
    {
      id: 2,
      name: "Running Shoes",
      price: 89.99,
      category: "Footwear",
      rating: 4.8,
      image: shoe,
      color: "White",
      size: "42",
    },
    {
      id: 3,
      name: "Wireless Headphones",
      price: 129.99,
      category: "Electronics",
      rating: 4.7,
      image: headphones,
      color: "Black",
      brand: "SoundMax",
    },
    {
      id: 4,
      name: "Laptop Backpack",
      price: 59.99,
      category: "Accessories",
      rating: 4.2,
      image: backpack,
      color: "Blue",
      material: "Nylon",
    },
    {
      id: 5,
      name: "Smart Watch",
      price: 199.99,
      category: "Electronics",
      rating: 4.6,
      image: watch,
      color: "Silver",
      brand: "TechWear",
    },
    {
      id: 6,
      name: "Water Bottle",
      price: 24.99,
      category: "Accessories",
      rating: 4.3,
      image:  bottle,
      color: "Green",
      material: "Stainless Steel",
    },
  ])

  const [activeFilters, setActiveFilters] = useState<{
    priceRange: [number, number]
    categories: string[]
    colors: string[]
    rating: number
  }>({
    priceRange: [0, 200],
    categories: [],
    colors: [],
    rating: 0,
  })

  const handleFilterChange = (filters:any) => {
    setActiveFilters(filters)
  }

  const filteredProducts = products.filter((product:any) => {
    // Search filter
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())

    // Price filter
    const matchesPrice = product.price >= activeFilters.priceRange[0] && product.price <= activeFilters.priceRange[1]

    // Category filter
    const matchesCategory = activeFilters.categories.length === 0 || activeFilters.categories.includes(product?.category)

    // Color filter
    const matchesColor =
      activeFilters.colors.length === 0 || (product.color && activeFilters.colors.includes(product.color))

    // Rating filter
    const matchesRating = product.rating >= activeFilters.rating

    return matchesSearch && matchesPrice && matchesCategory && matchesColor && matchesRating
  })

  return (
    <main className="min-h-screen p-4 md:p-8 relative">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Catalog</h1>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            className="pl-10"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={18} />
            Filters
          </Button>
          <Button variant="outline" className="flex items-center gap-2 relative" onClick={() => setShowCart(!showCart)}>
            <ShoppingCart size={18} />
            Cart
            {cart.length > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar - Only shown when filters are toggled */}
        {showFilters && (
          <div className="w-full md:w-64 mb-6 md:mb-0">
            <FilterSidebar activeFilters={activeFilters} onFilterChange={handleFilterChange} />
          </div>
        )}

        {/* Product Grid */}
        <div className={`flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-xl text-gray-500">No products found</p>
            </div>
          )}
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} />
    </main>
  )
}

