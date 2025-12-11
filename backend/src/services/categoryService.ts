import prisma from '../prisma/client.ts'
import { CreateCategoryDto, UpdateCategoryDto } from '../schemas/categorySchemas.ts'

export const getAllCategories = async () => {
  return await prisma.itemCategory.findMany({
    orderBy: { id: 'asc' },
  })
}

export const getCategoryById = async (id: number) => {
  return await prisma.itemCategory.findUnique({
    where: { id },
  })
}

export const createCategory = async (data: CreateCategoryDto) => {
  const existing = await prisma.itemCategory.findUnique({
    where: { name: data.name },
  })
  if (existing) {
    throw new Error('Category with this name already exists')
  }

  return await prisma.itemCategory.create({
    data: { name: data.name },
  })
}

export const updateCategory = async (id: number, data: UpdateCategoryDto) => {
  if (data.name) {
    const existing = await prisma.itemCategory.findUnique({
      where: { name: data.name },
    })
    if (existing && existing.id !== id) {
      throw new Error('Another category with this name already exists')
    }
  }

  return await prisma.itemCategory.update({
    where: { id },
    data,
  })
}

export const deleteCategory = async (id: number) => {
  const itemsCount = await prisma.item.count({
    where: { categoryId: id },
  })
  if (itemsCount > 0) {
    throw new Error('Cannot delete category — it has items')
  }

  return await prisma.itemCategory.delete({
    where: { id },
  })
}