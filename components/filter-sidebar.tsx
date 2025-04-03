"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface FilterSidebarProps {
  activeFilters: {
    priceRange: number[]
    categories: string[]
    colors: string[]
    rating: number
  }
  onFilterChange: (filters: any) => void
}

export default function FilterSidebar({ activeFilters, onFilterChange }: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState(activeFilters)

  const categories = ["Clothing", "Footwear", "Electronics", "Accessories"]
  const colors = ["Black", "White", "Blue", "Green", "Silver"]
  const ratings = [
    { value: 0, label: "Any Rating" },
    { value: 3, label: "3+ Stars" },
    { value: 4, label: "4+ Stars" },
    { value: 4.5, label: "4.5+ Stars" },
  ]

  useEffect(() => {
    setLocalFilters(activeFilters)
  }, [activeFilters])

  const handleCategoryChange = (category: string) => {
    const updatedCategories = localFilters.categories.includes(category)
      ? localFilters.categories.filter((c) => c !== category)
      : [...localFilters.categories, category]

    setLocalFilters({
      ...localFilters,
      categories: updatedCategories,
    })
  }

  const handleColorChange = (color: string) => {
    const updatedColors = localFilters.colors.includes(color)
      ? localFilters.colors.filter((c) => c !== color)
      : [...localFilters.colors, color]

    setLocalFilters({
      ...localFilters,
      colors: updatedColors,
    })
  }

  const handleRatingChange = (rating: string) => {
    setLocalFilters({
      ...localFilters,
      rating: Number.parseFloat(rating),
    })
  }

  const handlePriceChange = (values: number[]) => {
    setLocalFilters({
      ...localFilters,
      priceRange: values,
    })
  }

  const applyFilters = () => {
    onFilterChange(localFilters)
  }

  const resetFilters = () => {
    const resetFilters = {
      priceRange: [0, 200],
      categories: [],
      colors: [],
      rating: 0,
    }
    setLocalFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <div className="bg-white p-4 rounded-lg border">
      <h3 className="font-medium text-lg mb-4">Filters</h3>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Price Range</h4>
        <Slider value={localFilters.priceRange} max={200} step={1} onValueChange={handlePriceChange} className="mb-2" />
        <div className="flex justify-between text-sm">
          <span>${localFilters.priceRange[0]}</span>
          <span>${localFilters.priceRange[1]}</span>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <Checkbox
                id={`category-${category}`}
                checked={localFilters.categories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={`category-${category}`} className="ml-2">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Colors</h4>
        <div className="space-y-2">
          {colors.map((color) => (
            <div key={color} className="flex items-center">
              <Checkbox
                id={`color-${color}`}
                checked={localFilters.colors.includes(color)}
                onCheckedChange={() => handleColorChange(color)}
              />
              <Label htmlFor={`color-${color}`} className="ml-2 flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{
                    backgroundColor: color.toLowerCase(),
                    border: color.toLowerCase() === "white" ? "1px solid #ddd" : "none",
                  }}
                ></div>
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Rating</h4>
        <RadioGroup value={localFilters.rating.toString()} onValueChange={handleRatingChange}>
          {ratings.map((rating) => (
            <div key={rating.value} className="flex items-center">
              <RadioGroupItem value={rating.value.toString()} id={`rating-${rating.value}`} />
              <Label htmlFor={`rating-${rating.value}`} className="ml-2">
                {rating.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button className="w-full" onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button variant="outline" className="w-full" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  )
}

