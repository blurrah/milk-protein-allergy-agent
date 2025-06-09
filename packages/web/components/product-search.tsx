"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star } from "lucide-react"
import { useState } from "react"

interface Product {
  id: string
  name: string
  brand: string
  category: string
  price: string
  rating: number
  reviews: number
  image: string
  safe: boolean
  allergens: string[]
  description: string
  ingredients: string
  verified: boolean
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Original Oat Milk",
    brand: "Oatly",
    category: "Milk Alternatives",
    price: "$4.99",
    rating: 4.8,
    reviews: 1247,
    image: "/placeholder.svg?height=200&width=200",
    safe: true,
    allergens: [],
    description: "Creamy oat milk perfect for cereals, coffee, and baking",
    ingredients:
      "Oat base (water, oats), contains 2% or less of: low erucic acid rapeseed oil, dipotassium phosphate, calcium carbonate, calcium phosphates, sea salt, dicalcium phosphate, tricalcium phosphate, vitamin A, vitamin D2, riboflavin, vitamin B12",
    verified: true,
  },
  {
    id: "2",
    name: "Coconut Milk Yogurt",
    brand: "So Delicious",
    category: "Yogurt",
    price: "$5.49",
    rating: 4.6,
    reviews: 892,
    image: "/placeholder.svg?height=200&width=200",
    safe: true,
    allergens: [],
    description: "Probiotic-rich coconut yogurt with live cultures",
    ingredients: "Organic coconut milk, organic cane sugar, pectin, locust bean gum, live cultures",
    verified: true,
  },
  {
    id: "3",
    name: "Almond Cheese Slices",
    brand: "Violife",
    category: "Cheese Alternatives",
    price: "$4.99",
    rating: 4.7,
    reviews: 634,
    image: "/placeholder.svg?height=200&width=200",
    safe: true,
    allergens: ["Tree Nuts"],
    description: "Melty almond-based cheese slices for sandwiches",
    ingredients: "Water, coconut oil, modified starch, sea salt, almond protein, olive extract, vitamin B12",
    verified: true,
  },
  {
    id: "4",
    name: "Cashew Ice Cream",
    brand: "Ben & Jerry's",
    category: "Ice Cream",
    price: "$6.99",
    rating: 4.9,
    reviews: 2156,
    image: "/placeholder.svg?height=200&width=200",
    safe: true,
    allergens: ["Tree Nuts"],
    description: "Rich and creamy cashew-based ice cream",
    ingredients: "Cashew milk, organic cane sugar, coconut oil, cocoa powder, vanilla extract",
    verified: true,
  },
  {
    id: "5",
    name: "Regular Milk Chocolate",
    brand: "Hershey's",
    category: "Chocolate",
    price: "$2.99",
    rating: 4.2,
    reviews: 3421,
    image: "/placeholder.svg?height=200&width=200",
    safe: false,
    allergens: ["Milk", "Soy"],
    description: "Classic milk chocolate bar",
    ingredients: "Milk chocolate, sugar, cocoa butter, milk, chocolate, lactose, milk fat, soy lecithin",
    verified: true,
  },
]

export function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showSafeOnly, setShowSafeOnly] = useState(true)
  const [sortBy, setSortBy] = useState("rating")

  const categories = ["all", "Milk Alternatives", "Yogurt", "Cheese Alternatives", "Ice Cream", "Chocolate"]

  const filteredProducts = mockProducts
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesSafety = !showSafeOnly || product.safe
      return matchesSearch && matchesCategory && matchesSafety
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "price") return Number.parseFloat(a.price.slice(1)) - Number.parseFloat(b.price.slice(1))
      if (sortBy === "name") return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <div>
      <div className="space-y-4 mb-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search products, brands, or ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price">Price: Low to High</SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Checkbox id="safe-only" checked={showSafeOnly} onCheckedChange={(checked) => setShowSafeOnly(checked === "indeterminate" ? false : checked)} />
            <label htmlFor="safe-only" className="text-sm font-medium">
              Safe products only
            </label>
          </div>

          <div className="text-sm text-gray-600 flex items-center">Showing {filteredProducts.length} products</div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardContent className="p-0">
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  {product.verified && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Verified
                    </Badge>
                  )}
                  <Badge variant={product.safe ? "default" : "destructive"}>{product.safe ? "Safe" : "Not Safe"}</Badge>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3">
                <div className="mb-2">
                  <h3 className="font-semibold mb-0">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                </div>

                {/* Allergens */}
                {product.allergens.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs font-medium text-gray-700 mb-1">Contains:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.allergens.map((allergen) => (
                        <Badge key={allergen} variant="outline" className="text-xs">
                          {allergen}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rating and Price */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="font-bold text-green-600">{product.price}</span>
                </div>

                {/* Actions */}
                <Button size="sm" className="w-full">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-8 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search terms or filters.</p>
          <Button
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("all")
              setShowSafeOnly(false)
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
