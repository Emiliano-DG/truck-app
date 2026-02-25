import z from 'zod'

export const movementSchema = z.object({
  description: z.string().min(3, 'La descripción es muy corta'),
  amount: z.coerce.number().positive('El monto debe ser positivo'),
  type: z.enum(['ingreso', 'comision']),
  date: z.string().min(1, 'La fecha es obligatoria'),
})

export type MovementSchema = z.infer<typeof movementSchema>
