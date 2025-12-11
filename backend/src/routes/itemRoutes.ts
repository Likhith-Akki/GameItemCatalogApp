import { Router } from 'express'
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/itemController.ts'
import { validateRequest } from '../middlewares/validateRequest.ts'
import { createItemSchema, updateItemSchema } from '../schemas/itemSchemas.ts'

const router = Router()

router.get('/', getAllItems)
router.get('/:id', getItemById)
router.post('/', validateRequest(createItemSchema), createItem)
router.put('/:id', validateRequest(updateItemSchema), updateItem)
router.delete('/:id', deleteItem)

export default router