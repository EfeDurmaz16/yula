import type { Id } from '../convex/_generated/dataModel'

export type AppEnv = {
  Variables: {
    session: unknown
    user: unknown
    userId: Id<'users'>
  }
}
