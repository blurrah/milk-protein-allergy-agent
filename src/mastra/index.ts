
import { Mastra } from '@mastra/core/mastra';
import { LibSQLStore } from '@mastra/libsql';

import { milkAllergyAgent } from './agents/milk-allergy-agent';
import { weatherAgent } from './agents/weather-agent';
import { logger } from './lib/logger';

export const mastra = new Mastra({
  agents: { weatherAgent, milkAllergyAgent },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger
});
