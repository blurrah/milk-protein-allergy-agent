"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Send, Bot, User, ShoppingCart } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
  products?: Array<{
    name: string
    brand: string
    safe: boolean
    reason: string
  }>
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "How can I help you find allergy-safe products today?",
      timestamp: new Date(),
      suggestions: [
        "Is Oreo cookies safe for milk allergies?",
        "Show me oat milk alternatives",
        "Recipe for dairy-free mac and cheese",
        "What brands make safe chocolate?",
      ],
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: getSimulatedResponse(input),
        timestamp: new Date(),
        suggestions: [
          "Tell me more about this product",
          "Show similar alternatives",
          "Find recipes using this ingredient",
        ],
        products: input.toLowerCase().includes("oreo")
          ? [
              {
                name: "Original Oreo Cookies",
                brand: "Nabisco",
                safe: false,
                reason: "Contains milk proteins",
              },
              {
                name: "Oreo Thins",
                brand: "Nabisco",
                safe: false,
                reason: "Contains milk proteins",
              },
            ]
          : undefined,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const getSimulatedResponse = (query: string) => {
    if (query.toLowerCase().includes("oreo")) {
      return "I've checked Oreo products for you. Unfortunately, most Oreo varieties contain milk proteins and are not safe for cow milk allergies. However, I can suggest some delicious alternatives like Newman's Own Chocolate Creme cookies or Enjoy Life Dark Chocolate Mini cookies, which are specifically made without milk ingredients."
    }
    if (query.toLowerCase().includes("oat milk")) {
      return "Great choice! Oat milk is an excellent dairy-free alternative. Some top-rated brands include Oatly, Planet Oat, and Califia Farms. These are all free from cow milk and most are also soy-free. Would you like me to show you specific products or recipes using oat milk?"
    }
    return "I understand you're looking for information about allergy-safe foods. Let me help you find the best options that are free from cow milk and soy proteins. Could you be more specific about what type of product or recipe you're interested in?"
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  return (
    <div className="h-[500px] flex flex-col">
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                <div className={`flex items-start gap-2 ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === "user" ? "bg-blue-600" : "bg-green-600"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.type === "user" ? "bg-blue-600 text-white" : "bg-white border shadow-sm"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {/* Product Results */}
                {message.products && (
                  <div className="mt-3 space-y-2">
                    {message.products.map((product, index) => (
                      <Card key={index} className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-gray-600">{product.brand}</p>
                          </div>
                          <Badge variant={product.safe ? "default" : "destructive"}>
                            {product.safe ? "Safe" : "Not Safe"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{product.reason}</p>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
                {message.suggestions && message.type === "assistant" && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border shadow-sm rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t mt-4 pt-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about products, ingredients, or recipes..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-3">
          <Button variant="outline" size="sm" onClick={() => setInput("Show me safe chocolate brands")}>
            <ShoppingCart className="w-3 h-3 mr-1" />
            Products
          </Button>
          <Button variant="outline" size="sm" onClick={() => setInput("Recipe for dairy-free pancakes")}>
            <ShoppingCart className="w-3 h-3 mr-1" />
            Recipes
          </Button>
        </div>
      </div>
    </div>
  )
}
