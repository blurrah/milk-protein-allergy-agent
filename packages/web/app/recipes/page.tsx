"use client"
import { RecipeSearch } from "@/components/recipe-search"

interface Recipe {
  id: string
  title: string
  description: string
  image: string
  cookTime: number
  servings: number
  difficulty: "Easy" | "Medium" | "Hard"
  rating: number
  reviews: number
  category: string
  tags: string[]
  ingredients: string[]
  instructions: string[]
  dairyFree: boolean
  soyFree: boolean
  glutenFree: boolean
  vegan: boolean
}

const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Creamy Oat Milk Mac and Cheese",
    description: "Rich and creamy mac and cheese made with oat milk and nutritional yeast",
    image: "/placeholder.svg?height=200&width=300",
    cookTime: 25,
    servings: 4,
    difficulty: "Easy",
    rating: 4.8,
    reviews: 342,
    category: "Main Dishes",
    tags: ["Comfort Food", "Kid-Friendly", "Quick"],
    ingredients: [
      "1 lb pasta",
      "2 cups oat milk",
      "1/2 cup nutritional yeast",
      "2 tbsp flour",
      "1 tsp garlic powder",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Cook pasta according to package directions",
      "In a saucepan, whisk flour with oat milk",
      "Add nutritional yeast and seasonings",
      "Simmer until thickened",
      "Toss with cooked pasta",
    ],
    dairyFree: true,
    soyFree: true,
    glutenFree: false,
    vegan: true,
  },
  {
    id: "2",
    title: "Coconut Milk Pancakes",
    description: "Fluffy pancakes made with coconut milk for a tropical twist",
    image: "/placeholder.svg?height=200&width=300",
    cookTime: 15,
    servings: 6,
    difficulty: "Easy",
    rating: 4.7,
    reviews: 189,
    category: "Breakfast",
    tags: ["Weekend Brunch", "Sweet", "Fluffy"],
    ingredients: [
      "2 cups flour",
      "1 can coconut milk",
      "2 eggs",
      "2 tbsp sugar",
      "1 tsp baking powder",
      "1/2 tsp salt",
    ],
    instructions: [
      "Mix dry ingredients in a bowl",
      "Whisk coconut milk and eggs",
      "Combine wet and dry ingredients",
      "Cook on griddle until golden",
      "Serve with maple syrup",
    ],
    dairyFree: true,
    soyFree: true,
    glutenFree: false,
    vegan: false,
  },
  {
    id: "3",
    title: "Cashew Cream Pasta",
    description: "Luxurious pasta with cashew cream sauce and herbs",
    image: "/placeholder.svg?height=200&width=300",
    cookTime: 30,
    servings: 4,
    difficulty: "Medium",
    rating: 4.9,
    reviews: 267,
    category: "Main Dishes",
    tags: ["Gourmet", "Creamy", "Elegant"],
    ingredients: [
      "1 cup raw cashews",
      "1 lb pasta",
      "2 cloves garlic",
      "1/4 cup nutritional yeast",
      "Fresh herbs",
      "Lemon juice",
    ],
    instructions: [
      "Soak cashews for 2 hours",
      "Blend cashews with water until smooth",
      "Cook pasta al dente",
      "Sauté garlic, add cashew cream",
      "Toss with pasta and herbs",
    ],
    dairyFree: true,
    soyFree: true,
    glutenFree: false,
    vegan: true,
  },
  {
    id: "4",
    title: "Almond Milk Smoothie Bowl",
    description: "Nutritious smoothie bowl topped with fresh fruits and nuts",
    image: "/placeholder.svg?height=200&width=300",
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    rating: 4.6,
    reviews: 156,
    category: "Breakfast",
    tags: ["Healthy", "Quick", "Colorful"],
    ingredients: [
      "2 cups almond milk",
      "1 frozen banana",
      "1/2 cup berries",
      "1 tbsp chia seeds",
      "Granola for topping",
      "Fresh fruit for topping",
    ],
    instructions: [
      "Blend almond milk, banana, and berries",
      "Pour into bowls",
      "Top with chia seeds",
      "Add granola and fresh fruit",
      "Serve immediately",
    ],
    dairyFree: true,
    soyFree: true,
    glutenFree: true,
    vegan: true,
  },
]

export default function RecipesPage() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Recipe Search</h1>
        <p className="text-gray-600">Find recipes safe for cow milk and soy allergies</p>
      </div>

      <RecipeSearch />
    </div>
  )
}
