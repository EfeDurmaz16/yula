import { createMiddleware } from 'hono/factory'
import { auth } from '../lib/auth'
import type { AppEnv } from '../types'

export const authMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  })

  if (!session) {
    return c.json(
      {
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Not authenticated' },
      },
      401,
    )
  }

  c.set('session', session.session)
  c.set('user', session.user)
  c.set('userId', session.user.id as AppEnv['Variables']['userId'])

  await next()
})
