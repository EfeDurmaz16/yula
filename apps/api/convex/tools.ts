import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const listByUser = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('tools')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .collect()
  },
})

export const create = mutation({
  args: {
    userId: v.id('users'),
    name: v.string(),
    description: v.string(),
    endpoint: v.string(),
    schema: v.any(),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('tools', {
      userId: args.userId,
      name: args.name,
      description: args.description,
      endpoint: args.endpoint,
      schema: args.schema,
      isActive: args.isActive ?? true,
    })
  },
})

export const update = mutation({
  args: {
    id: v.id('tools'),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    endpoint: v.optional(v.string()),
    schema: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args
    const updates: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        updates[key] = value
      }
    }
    await ctx.db.patch(id, updates)
    return await ctx.db.get(id)
  },
})

export const remove = mutation({
  args: { id: v.id('tools') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})

export const toggle = mutation({
  args: { id: v.id('tools') },
  handler: async (ctx, args) => {
    const tool = await ctx.db.get(args.id)
    if (!tool) throw new Error('Tool not found')
    await ctx.db.patch(args.id, { isActive: !tool.isActive })
    return await ctx.db.get(args.id)
  },
})
