"use client"
import { ChatInterface } from "@/components/chat-interface"

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

export default function ChatPage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">AI Assistant</h1>
        <p className="text-gray-600">Get answers about allergy-safe products and recipes</p>
      </div>

      <div className="border rounded-lg p-4 bg-white">
        <ChatInterface />
      </div>
    </div>
  )
}
