
import { Mastra } from '@mastra/core/mastra';
import { LibSQLStore } from '@mastra/libsql';

import { serve } from '@mastra/inngest';
import { ingredientsInspectorAgent } from './agents/ingredients-inspector-agent';
import { milkAllergyAgent } from './agents/milk-allergy-agent';
import { weatherAgent } from './agents/weather-agent';
import { inngest } from './lib/inngest';
import { logger } from './lib/logger';
import { foodWorkflow } from './workflow';

export const mastra = new Mastra({
  workflows: { foodWorkflow },
  agents: { weatherAgent, milkAllergyAgent, ingredientsInspectorAgent },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  server: {
    host: "0.0.0.0",
    apiRoutes: [
      {
        path: "/api/inngest",
        method: "ALL",
        createHandler: async ({ mastra }) => serve({ mastra, inngest})
      }
    ]
  },
  logger
});
