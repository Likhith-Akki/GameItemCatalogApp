import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body)
      next()
    } catch (error: any) {
      return _res.status(400).json({
        error: 'Validation failed',
        details: error.errors.map((e: any) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      })
    }
  }
}