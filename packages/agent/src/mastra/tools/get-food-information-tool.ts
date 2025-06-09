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

export async function getFoodInformation(foodName: string) {
  const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${foodName}&search_simple=1&json=1`, {

  });
  if (!response.ok) {
    throw new Error(`Failed to fetch food information: ${response.statusText}`);
  }

  const data = await response.json();

  logger.info("food information", { products: Object.keys(data.products), isArray: Array.isArray(data.products), isData: !!data  });

  if (!data || !Array.isArray(data.products)) {
    throw new Error(`No food information found for ${foodName}`);
  }

  return data.products[0]

}
