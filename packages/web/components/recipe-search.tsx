"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, Search, Clock, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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

export function RecipeSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [dairyFreeOnly, setDairyFreeOnly] = useState(true)
  const [soyFreeOnly, setSoyFreeOnly] = useState(false)
  const [veganOnly, setVeganOnly] = useState(false)
  const [sortBy, setSortBy] = useState("rating")

  const categories = ["all", "Breakfast", "Main Dishes", "Desserts", "Snacks", "Beverages"]
  const difficulties = ["all", "Easy", "Medium", "Hard"]

  const filteredRecipes = mockRecipes
    .filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || recipe.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === "all" || recipe.difficulty === selectedDifficulty
      const matchesDairy = !dairyFreeOnly || recipe.dairyFree
      const matchesSoy = !soyFreeOnly || recipe.soyFree
      const matchesVegan = !veganOnly || recipe.vegan

      return matchesSearch && matchesCategory && matchesDifficulty && matchesDairy && matchesSoy && matchesVegan
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "time") return a.cookTime - b.cookTime
      if (sortBy === "title") return a.title.localeCompare(b.title)
      return 0
    })

  return (
    <div>
      <div className="space-y-4 mb-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search recipes, ingredients, or cooking methods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty === "all" ? "All Levels" : difficulty}
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
              <SelectItem value="time">Cooking Time</SelectItem>
              <SelectItem value="title">Recipe Name</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Dietary Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="dairy-free" checked={dairyFreeOnly} onCheckedChange={setDairyFreeOnly} />
            <label htmlFor="dairy-free" className="text-sm font-medium">
              Dairy-Free
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="soy-free" checked={soyFreeOnly} onCheckedChange={setSoyFreeOnly} />
            <label htmlFor="soy-free" className="text-sm font-medium">
              Soy-Free
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="vegan" checked={veganOnly} onCheckedChange={setVeganOnly} />
            <label htmlFor="vegan" className="text-sm font-medium">
              Vegan
            </label>
          </div>
          <div className="text-sm text-gray-600 ml-auto">{filteredRecipes.length} recipes found</div>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecipes.map((recipe) => (
          <Card key={recipe.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img src={recipe.image || "/placeholder.svg"} alt={recipe.title} className="w-full h-40 object-cover" />
                <Badge variant="secondary" className="absolute bottom-2 left-2 bg-white/90">
                  {recipe.difficulty}
                </Badge>
              </div>

              <div className="p-3">
                <div className="mb-2">
                  <h3 className="font-semibold mb-0">{recipe.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-1">{recipe.description}</p>
                </div>

                {/* Recipe Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.cookTime}m</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings}</span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{recipe.rating}</span>
                  </div>
                </div>

                {/* Dietary Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {recipe.dairyFree && (
                    <Badge variant="outline" className="text-xs">
                      Dairy-Free
                    </Badge>
                  )}
                  {recipe.soyFree && (
                    <Badge variant="outline" className="text-xs">
                      Soy-Free
                    </Badge>
                  )}
                  {recipe.vegan && (
                    <Badge variant="outline" className="text-xs">
                      Vegan
                    </Badge>
                  )}
                </div>

                <Button size="sm" className="w-full">
                  View Recipe
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-8 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">No recipes found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search terms or filters.</p>
          <Button
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("all")
              setSelectedDifficulty("all")
              setDairyFreeOnly(false)
              setSoyFreeOnly(false)
              setVeganOnly(false)
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  )
}
