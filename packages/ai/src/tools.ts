import { tool } from 'ai'
import { z } from 'zod'

export const tools = {
  searchMemory: tool({
    description: 'Search through user memories for relevant context',
    parameters: z.object({
      query: z.string().describe('The search query'),
      limit: z.number().optional().default(5).describe('Maximum results'),
    }),
  }),

  saveMemory: tool({
    description: 'Save a piece of information to long-term memory',
    parameters: z.object({
      content: z.string().describe('The content to remember'),
      source: z
        .enum(['conversation', 'proactive', 'tool'])
        .default('conversation')
        .describe('Where this memory came from'),
    }),
  }),

  webSearch: tool({
    description: 'Search the web for current information',
    parameters: z.object({
      query: z.string().describe('The search query'),
    }),
  }),
}
