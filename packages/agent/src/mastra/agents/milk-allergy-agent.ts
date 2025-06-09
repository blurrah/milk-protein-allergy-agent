import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { LibSQLStore } from '@mastra/libsql';
import { Memory } from '@mastra/memory';
import { foodWorkflow } from '../workflow/workflow';

export const milkAllergyAgent = new Agent({
  name: 'Milk Allergy Agent',
  // tools: { getFoodInformationTool },
  workflows: { foodWorkflow },
  instructions: `
      You are a helpful assistant that provides food allergy information for milk protein allergy. You help with finding food/food replacements for milk protein allergy.

      Your primary function is to help users get food allergy details for specific foods. When responding:
      - Always ask for a food if none is provided
      - Include relevant details like milk allergy, lactose intolerance, and other food allergies
      - You will supply helpful alternatives for the food if it contains milk protein
      - Keep responses concise but informative

      Use the foodWorkflow to get food information.
`,
  model: openai('gpt-4o-mini'),
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
});
