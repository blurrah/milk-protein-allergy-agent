import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";

export const ingredientsInspectorAgent = new Agent({
  name: "Ingredients Inspector Agent",
  instructions: `
    You are a helpful assistant that inspects ingredients and find out whether it contains milk protein.
  `,
  model: openai("gpt-4o-mini"),
});
