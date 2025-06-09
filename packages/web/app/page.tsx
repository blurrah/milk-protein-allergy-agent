import { ChatInterface } from "@/components/chat-interface"
import { ProductSearch } from "@/components/product-search"
import { RecipeSearch } from "@/components/recipe-search"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChefHat, MessageCircle, Search, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Allergy Product Finder</h1>
        <p className="text-gray-600">Find products and recipes safe for cow milk and soy allergies</p>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span>AI Assistant</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            <span>Products</span>
          </TabsTrigger>
          <TabsTrigger value="recipes" className="flex items-center gap-2">
            <ChefHat className="w-4 h-4" />
            <span>Recipes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">AI Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <ChatInterface />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Product Search</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductSearch />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recipes" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recipe Search</CardTitle>
            </CardHeader>
            <CardContent>
              <RecipeSearch />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Quick Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/products?category=milk-alternatives">
                <Search className="w-4 h-4 mr-2" />
                Milk Alternatives
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/products?category=cheese-alternatives">
                <Search className="w-4 h-4 mr-2" />
                Cheese Alternatives
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/recipes?category=breakfast">
                <ChefHat className="w-4 h-4 mr-2" />
                Breakfast Recipes
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Recent Searches</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between items-center py-1 border-b">
              <span>&quot;Oat milk brands&quot;</span>
              <Button variant="ghost" size="sm">
                <Search className="w-3 h-3" />
              </Button>
            </div>
            <div className="flex justify-between items-center py-1 border-b">
              <span>&quot;Dairy-free chocolate&quot;</span>
              <Button variant="ghost" size="sm">
                <Search className="w-3 h-3" />
              </Button>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>&quot;Coconut yogurt alternatives&quot;</span>
              <Button variant="ghost" size="sm">
                <Search className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Recently Viewed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between items-center py-1 border-b">
              <span>Oatly Original Oat Milk</span>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/products/oatly-original">View</Link>
              </Button>
            </div>
            <div className="flex justify-between items-center py-1 border-b">
              <span>So Delicious Coconut Yogurt</span>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/products/so-delicious-yogurt">View</Link>
              </Button>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>Dairy-Free Mac and Cheese Recipe</span>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/recipes/dairy-free-mac">View</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
