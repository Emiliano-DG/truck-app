import { z } from 'zod'
import { CATEGORIES } from './businessMovementCategory'

export const businessMovementSchema = z.object({
  description: z.string().min(3, 'Descripción requerida'),
  amount: z.coerce.number().positive('Monto mayor a 0'),
  type: z.enum(['ingreso', 'gasto']), // <--- Agregamos el tipo
  category: z.enum(CATEGORIES),
  date: z.string().min(1),
})

export type BusinessMovementFormData = z.infer<typeof businessMovementSchema>
