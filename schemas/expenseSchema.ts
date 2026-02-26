import { CATEGORIES } from '@/features/expenses/expenseCategories'
import z from 'zod'

export const expenseSchema = z.object({
  description: z.string().min(3, 'Descripción requerida'),
  amount: z.coerce.number().positive('El monto debe ser positivo'),
  type: z.enum(CATEGORIES),
  date: z.string().min(1, ' Fecha requerida'),
})

export type ExpenseFormValues = z.infer<typeof expenseSchema>
