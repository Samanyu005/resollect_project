"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Upload, Search } from "lucide-react"
import ProductCard from "@/components/product-card"
import FilterSidebar from "@/components/filter-sidebar"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Comfortable T-Shirt",
      price: 29.99,
      category: "Clothing",
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Running Shoes",
      price: 89.99,
      category: "Footwear",
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "Wireless Headphones",
      price: 129.99,
      category: "Electronics",
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      name: "Laptop Backpack",
      price: 59.99,
      category: "Accessories",
      rating: 4.2,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 5,
      name: "Smart Watch",
      price: 199.99,
      category: "Electronics",
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 6,
      name: "Water Bottle",
      price: 24.99,
      category: "Accessories",
      rating: 4.3,
      image: "/placeholder.svg?height=200&width=200",
    },
  ])

  const handleFileUpload = (event:any) => {
    const file = event.target.files[0]
    if (file) {
      alert(`File "${file.name}" uploaded successfully!`)
      // In a real app, you would process the file here
    }
  }

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <main className="min-h-screen p-4 md:p-8">
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
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => document.getElementById("fileUpload")?.click()}
          >
            <Upload size={18} />
            Upload
            <input id="fileUpload" type="file" className="hidden" onChange={handleFileUpload} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar - Only shown when filters are toggled */}
        {showFilters && (
          <div className="w-full md:w-64 mb-6 md:mb-0">
            <FilterSidebar />
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
    </main>
  )
}

