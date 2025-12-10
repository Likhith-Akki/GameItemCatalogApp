import { Request, Response } from 'express'
import * as itemService from '../services/itemService.ts'

export const getAllItems = async (req: Request, res: Response) => {
  const { rarity, category } = req.query
  const result = await itemService.getAllItems({
    rarity: rarity as string | undefined,
    category: category as string | undefined,
  })
  res.json(result)
}

export const getItemById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const item = await itemService.getItemById(id)
  if (!item) return res.status(404).json({ error: 'Item not found' })
  res.json(item)
}

export const createItem = async (req: Request, res: Response) => {
  try {
    const item = await itemService.createItem(req.body)
    res.status(201).json(item)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const updateItem = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const item = await itemService.updateItem(id, req.body)
    res.json(item)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    await itemService.deleteItem(id)
    res.status(204).send()
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}