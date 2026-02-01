import { ConvexHttpClient } from 'convex/browser'

const CONVEX_URL = process.env.CONVEX_URL || 'https://sensible-sturgeon-193.convex.cloud'

let client: ConvexHttpClient | null = null

export function getConvexClient(): ConvexHttpClient {
  if (!client) {
    client = new ConvexHttpClient(CONVEX_URL)
  }
  return client
}
