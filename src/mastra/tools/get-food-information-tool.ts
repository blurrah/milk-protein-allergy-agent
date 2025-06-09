import { createTool } from "@mastra/core/tools";
import z from "zod";
import { logger } from "../lib/logger";

export const getFoodInformationTool = createTool({
  id: "get-food-information",
  description: "Get food information from Open Food Facts",
  inputSchema: z.object({
    foodName: z.string(),
  }),
  execute: async ({ context }) => {
    const foodName = context.foodName;
    return getFoodInformation(foodName);
  },
});

async function getFoodInformation(foodName: string) {
  const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${foodName}&search_simple=1&json=1`, {

  });
  if (!response.ok) {
    throw new Error(`Failed to fetch food information: ${response.statusText}`);
  }

  const data = await response.json();

  logger.info("food information", { products: Object.keys(data.products), isArray: Array.isArray(data.products)  });

  if (!data || Array.isArray(data.products) || data.products.length === 0) {
    throw new Error(`No food information found for ${foodName}`);
  }

  const product = data.products[0];

  if (!product) {
    throw new Error(`No food information found for ${foodName}`);
  }

  return product;
}
