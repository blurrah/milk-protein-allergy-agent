import { realtimeMiddleware } from "@inngest/realtime"
import { Inngest } from "inngest"


export const inngest = new Inngest({
  id: "mastra",
  baseUrl: "http://localhost:8288",
  isDev: true,
  middleware: [realtimeMiddleware()]
})
