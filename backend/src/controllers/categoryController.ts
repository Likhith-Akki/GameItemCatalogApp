import { Request, Response } from 'express'
import * as categoryService from '../services/categoryService.ts'

export const getAllCategories = async (_req: Request, res: Response) => {
  const categories = await categoryService.getAllCategories()
  res.json(categories)
}

export const getCategoryById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const category = await categoryService.getCategoryById(id)
  if (!category) return res.status(404).json({ error: 'Category not found' })
  res.json(category)
}

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.createCategory(req.body)
    res.status(201).json(category)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const category = await categoryService.updateCategory(id, req.body)
    res.json(category)
  } catch (error: any) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message })
    }
    res.status(400).json({ error: error.message })
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    await categoryService.deleteCategory(id)
    res.status(204).send()
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}