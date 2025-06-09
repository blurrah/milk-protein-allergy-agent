import { MCPClient } from "@mastra/mcp";

/**
 * TODO: Try this out with the MCPClient
 */
export const openFoodFactsMcp = new MCPClient({
  servers: {
    openFoodFacts: {
      command: "npx",
      args: ["-y", "@jagjeevan/openfoodfacts-mcp"],
    },
  },
});
