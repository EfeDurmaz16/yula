import type { Adapter } from 'better-auth'
import type { ConvexHttpClient } from 'convex/browser'

interface WhereClause {
  field: string
  value: string
}

type QueryFn = Parameters<ConvexHttpClient['query']>[0]
type MutationFn = Parameters<ConvexHttpClient['mutation']>[0]

export function createConvexAdapter(client: ConvexHttpClient): Adapter {
  // The adapter object is typed loosely because Better Auth's Adapter uses
  // generic methods (findOne<T>, findMany<T>, etc.) that cannot be satisfied
  // by concrete return types. We cast to Adapter at the return statement.
  const adapter = {
    id: 'convex',
    async create({ model, data }: { model: string; data: Record<string, unknown> }) {
      const tableName = modelToTable(model)
      const result = await client.mutation(
        `${tableName}:create` as unknown as MutationFn,
        normalizeForCreate(tableName, data),
      )
      if (typeof result === 'string') {
        return { id: result, ...data }
      }
      return { ...data, ...result }
    },
    // biome-ignore lint/suspicious/noExplicitAny: Better Auth Adapter generic T requires flexible casts
    async findOne({ model, where }: { model: string; where: any }) {
      const tableName = modelToTable(model)
      const field = (where as WhereClause[])[0].field
      const value = (where as WhereClause[])[0].value

      if (field === 'id' || field === '_id') {
        const result = await client.query(`${tableName}:getById` as unknown as QueryFn, {
          id: value,
        })
        return result ? normalizeFromConvex(result) : null
      }

      if (tableName === 'users' && field === 'email') {
        const result = await client.query('users:getByEmail' as unknown as QueryFn, {
          email: value,
        })
        return result ? normalizeFromConvex(result) : null
      }

      if (tableName === 'sessions' && field === 'token') {
        const result = await client.query('sessions:getByToken' as unknown as QueryFn, {
          token: value,
        })
        return result ? normalizeFromConvex(result) : null
      }

      if (tableName === 'accounts' && field === 'providerId') {
        const accountId = (where as WhereClause[]).find((w) => w.field === 'accountId')?.value
        if (accountId) {
          const result = await client.query(
            'accounts:getByProviderAccountId' as unknown as QueryFn,
            { providerId: value, accountId },
          )
          return result ? normalizeFromConvex(result) : null
        }
      }

      return null
    },
    // biome-ignore lint/suspicious/noExplicitAny: Better Auth Adapter generic T requires flexible casts
    async findMany({ model, where }: { model: string; where: any }) {
      const tableName = modelToTable(model)

      if (tableName === 'accounts' && (where as WhereClause[])?.[0]?.field === 'userId') {
        const results = await client.query('accounts:listByUser' as unknown as QueryFn, {
          userId: (where as WhereClause[])[0].value,
        })
        return ((results as Record<string, unknown>[]) || []).map(normalizeFromConvex)
      }

      return []
    },
    // biome-ignore lint/suspicious/noExplicitAny: Better Auth Adapter generic T requires flexible casts
    async update({ model, where, update: data }: { model: string; where: any; update: any }) {
      const tableName = modelToTable(model)
      const field = (where as WhereClause[])[0].field
      const value = (where as WhereClause[])[0].value

      let id = value
      if (field !== 'id' && field !== '_id') {
        const existing = (await adapter.findOne({ model, where })) as Record<string, string> | null
        if (!existing) return null
        id = existing.id
      }

      const result = await client.mutation(`${tableName}:update` as unknown as MutationFn, {
        id,
        ...data,
      })
      return result ? normalizeFromConvex(result) : null
    },
    // biome-ignore lint/suspicious/noExplicitAny: Better Auth Adapter generic T requires flexible casts
    async delete({ model, where }: { model: string; where: any }) {
      const tableName = modelToTable(model)
      const field = (where as WhereClause[])[0].field
      const value = (where as WhereClause[])[0].value

      if (tableName === 'sessions' && field === 'token') {
        await client.mutation('sessions:removeByToken' as unknown as MutationFn, { token: value })
        return
      }

      let id = value
      if (field !== 'id' && field !== '_id') {
        const existing = (await adapter.findOne({ model, where })) as Record<string, string> | null
        if (!existing) return
        id = existing.id
      }

      await client.mutation(`${tableName}:remove` as unknown as MutationFn, { id })
    },
    async count() {
      return 0
    },
    // biome-ignore lint/suspicious/noExplicitAny: Better Auth Adapter requires flexible types
    async updateMany({ model, where, update: data }: { model: string; where: any; update: any }) {
      const items = (await adapter.findMany({ model, where })) as Record<string, string>[]
      for (const item of items) {
        await adapter.update({ model, where: [{ field: 'id', value: item.id }], update: data })
      }
      return items.length
    },
    // biome-ignore lint/suspicious/noExplicitAny: Better Auth Adapter requires flexible types
    async deleteMany({ model, where }: { model: string; where: any }) {
      const items = (await adapter.findMany({ model, where })) as Record<string, string>[]
      for (const item of items) {
        await adapter.delete({ model, where: [{ field: 'id', value: item.id }] })
      }
      return items.length
    },
    async transaction(callback: (trx: unknown) => Promise<unknown>) {
      // Convex doesn't support multi-document transactions via HTTP client
      return callback(adapter as unknown as Parameters<typeof callback>[0])
    },
  }
  return adapter as unknown as Adapter
}

function modelToTable(model: string): string {
  const map: Record<string, string> = {
    user: 'users',
    session: 'sessions',
    account: 'accounts',
    verification: 'verification',
  }
  return map[model] || model
}

function normalizeFromConvex(doc: unknown): Record<string, unknown> | null {
  if (!doc) return null
  const { _id, _creationTime, ...rest } = doc as Record<string, unknown>
  return {
    id: _id,
    createdAt: new Date(_creationTime as number),
    ...rest,
  }
}

function normalizeForCreate(
  _table: string,
  data: Record<string, unknown>,
): Record<string, unknown> {
  const { id, createdAt, updatedAt, ...rest } = data
  return rest
}
