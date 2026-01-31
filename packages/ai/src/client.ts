import { createAnthropic } from '@ai-sdk/anthropic'

export interface AIClientOptions {
  apiKey?: string
  model?: string
}

export function createAIClient(options: AIClientOptions = {}) {
  return createAnthropic({
    apiKey: options.apiKey ?? process.env.ANTHROPIC_API_KEY,
  })
}
