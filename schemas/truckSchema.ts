import { z } from 'zod'

export const truckSchema = z.object({
  model: z.string().min(2, 'El modelo es requerido'),
  driverName: z.string().min(2, 'El nombre del conductor es requerido'),
})

export type TruckSchema = z.infer<typeof truckSchema>
