"use client"
import { ProductSearch } from "@/components/product-search"

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

export default function ProductsPage() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Product Search</h1>
        <p className="text-gray-600">Find products safe for cow milk and soy allergies</p>
      </div>

      <ProductSearch />
    </div>
  )
}
