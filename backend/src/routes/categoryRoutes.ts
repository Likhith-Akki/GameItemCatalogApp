import { Router } from 'express'
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.ts'
import { validateRequest } from '../middlewares/validateRequest.ts'
import { createCategorySchema, updateCategorySchema } from '../schemas/categorySchemas.ts'

const router = Router()

router.get('/', getAllCategories)
router.get('/:id', getCategoryById)
router.post('/', validateRequest(createCategorySchema), createCategory)
router.put('/:id', validateRequest(updateCategorySchema), updateCategory)
router.delete('/:id', deleteCategory)

export default router