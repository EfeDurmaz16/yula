import { z } from 'zod'

export const emailSchema = z.string().email()

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be at most 128 characters')

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
})

export const idSchema = z.string().min(1)

export type Pagination = z.infer<typeof paginationSchema>
