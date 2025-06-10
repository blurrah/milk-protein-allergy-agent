import { init } from "@mastra/inngest";
import z from "zod";
import { mastra } from "..";
import { inngest } from "../lib/inngest";
import { getFoodInformation } from "../tools/get-food-information-tool";

const { createWorkflow, createStep } = init(inngest);

const getFoodInformationStep = createStep({
  id: "get-food-information",
  description: "Get food information from Open Food Facts",
  inputSchema: z.object({
    foodName: z.string(),
  }),
  outputSchema: z.object({
    foodName: z.string(),
    ingredients: z.string(),
  }),
  execute: async ({ inputData }) => {
    const foodName = inputData.foodName;
    const foodInformation = await getFoodInformation(foodName);
    return {
      foodName,
      ingredients: foodInformation,
    };
  },
})

const ingredientsInspectorStep = createStep({
  id: "ingredients-inspector",
  description: "Inspect ingredients and find out whether it contains milk protein",
  inputSchema: z.object({
    foodName: z.string(),
    ingredients: z.string(),
  }),
  outputSchema: z.object({
    foodName: z.string(),
    milkProteinInformation: z.string(),
  }),
  execute: async ({ inputData }) => {
    const ingredients = inputData.ingredients;

    if (!ingredients) {
      throw new Error("No ingredients found");
    }

    const prompt = `Based on the following json data from open food facts, find milk protein: ${JSON.stringify(ingredients, null, 2)}`

    const agent = mastra.getAgent("ingredientsInspectorAgent")

    if (!agent) {
      throw new Error("Ingredients inspector agent not found");
    }

    const response = await agent.stream([{
      role: "user",
      content: prompt,
    }])

    let ingredientsText = "";
    for await (const chunk of response.textStream) {
      ingredientsText += chunk;
    }

    return {
      foodName: inputData.foodName,
      milkProteinInformation: ingredientsText,
    };
  },
})

export const foodWorkflow = createWorkflow({
  id: "food-workflow",
  inputSchema: z.object({
    foodName: z.string(),
  }),
  outputSchema: z.object({
    foodName: z.string(),
    milkProteinInformation: z.string(),
  }),
}).then(getFoodInformationStep).then(ingredientsInspectorStep)

foodWorkflow.commit()
