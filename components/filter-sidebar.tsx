"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

export default function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories = ["Clothing", "Footwear", "Electronics", "Accessories"]

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleFileUpload = (event:any) => {
    const file = event.target.files[0]
    if (file) {
      alert(`File "${file.name}" uploaded successfully!`)
      // In a real app, you would process the file here
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg border">
      <h3 className="font-medium text-lg mb-4">Filters</h3>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Price Range</h4>
        <Slider defaultValue={priceRange} max={200} step={1} onValueChange={setPriceRange} className="mb-2" />
        <div className="flex justify-between text-sm">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
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
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={`category-${category}`} className="ml-2">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Button */}
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={() => {
          const fileInput = document?.getElementById("sidebarFileUpload");
          if (fileInput) fileInput.click();
        }}
      >
        <Upload size={16} />
        Upload File
        <input id="sidebarFileUpload" type="file" className="hidden" onChange={handleFileUpload} />
      </Button>

      {/* Apply Filters Button */}
      <Button className="w-full mt-4">Apply Filters</Button>
    </div>
  )
}

