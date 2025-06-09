
import { Mastra } from '@mastra/core/mastra';
import { LibSQLStore } from '@mastra/libsql';

import { ingredientsInspectorAgent } from './agents/ingredients-inspector-agent';
import { milkAllergyAgent } from './agents/milk-allergy-agent';
import { weatherAgent } from './agents/weather-agent';
import { logger } from './lib/logger';
import { foodWorkflow } from './workflow/workflow';

export const mastra = new Mastra({
  workflows: { foodWorkflow },
  agents: { weatherAgent, milkAllergyAgent, ingredientsInspectorAgent },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger
});
