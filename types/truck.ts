import {
  GastoCategory,
  IngresoCategory,
} from '@/features/BusinessMovement/businessMovementCategory'

export interface Movement {
  id: string
  type: 'adelanto' | 'comision'
  amount: number
  date: string
  description: string
}

export interface Truck {
  id: string
  model: string //nombre del camión
  driverName: string //nombre del conductor
  movements: Movement[]
}

// Tipos para los movimientos generales del negocio (no asociados a un camión)
export type BusinessMovement =
  | {
      id: string
      date: string
      type: 'gasto'
      category: GastoCategory
      description: string
      amount: number
    }
  | {
      id: string
      date: string
      type: 'ingreso'
      category: IngresoCategory
      description: string
      amount: number
    }
