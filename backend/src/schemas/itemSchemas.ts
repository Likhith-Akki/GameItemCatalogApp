import { z } from 'zod'

const rarityEnum = z.enum(['Common', 'Rare', 'Epic', 'Legendary'])

export const createItemSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().optional(),
  categoryId: z.number().int().positive(),
  rarity: rarityEnum,
  levelRequirement: z.number().int().min(1).max(999),
  stats: z.record(z.any()),
})

export const updateItemSchema = createItemSchema.partial()

export type CreateItemDto = z.infer<typeof createItemSchema>
export type UpdateItemDto = z.infer<typeof updateItemSchema>
