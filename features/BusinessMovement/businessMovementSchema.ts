import { z } from 'zod'
import {
  CATEGORIASINGRESOS,
  CATEGORIESGASTOS,
} from './businessMovementCategory'

export const businessMovementSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('gasto'),
    description: z.string().min(3),
    amount: z.coerce.number().positive(),
    category: z.enum(CATEGORIESGASTOS),
    date: z.string().min(1),
  }),
  z.object({
    type: z.literal('ingreso'),
    description: z.string().min(3),
    amount: z.coerce.number().positive(),
    category: z.enum(CATEGORIASINGRESOS),
    date: z.string().min(1),
  }),
])

export type BusinessMovementFormData = z.infer<typeof businessMovementSchema>
