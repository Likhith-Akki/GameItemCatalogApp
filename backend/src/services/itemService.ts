import prisma from '../prisma/client.ts'
import { CreateItemDto, UpdateItemDto } from '../schemas/itemSchemas.ts'

type ItemFilters = {
  rarity?: string
  category?: string
}

export const getAllItems = async (filters: ItemFilters = {}) => {
  const where: any = {}

  if (filters.rarity) where.rarity = filters.rarity
  if (filters.category) {
    where.category = { name: filters.category }
  }

  const [total, items] = await Promise.all([
    prisma.item.count({ where }),
    prisma.item.findMany({
      where,
      include: { category: true },
      orderBy: { id: 'asc' },
    }),
  ])

  return { total, items }
}

export const getItemById = async (id: number) => {
  return await prisma.item.findUnique({
    where: { id },
    include: { category: true },
  })
}

export const createItem = async (data: CreateItemDto) => {
  const exists = await prisma.item.findFirst({
    where: { name: data.name },
  })
  if (exists) {
    throw new Error('Item with this name already exists')
  }

  return await prisma.item.create({
    data,
    include: { category: true },
  })
}

export const updateItem = async (id: number, data: UpdateItemDto) => {
  if (data.name) {
    const exists = await prisma.item.findFirst({
      where: { name: data.name, NOT: { id } },
    })
    if (exists) {
      throw new Error('Another item with this name already exists')
    }
  }

  return await prisma.item.update({
    where: { id },
    data,
    include: { category: true },
  })
}

export const deleteItem = async (id: number) => {
  return await prisma.item.delete({ where: { id } })
}