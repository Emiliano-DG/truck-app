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

export type BusinessCategory = 'Combustible' | 'Seguro' | 'Taller' | 'Otros'

export interface BusinessMovement {
  id: string
  date: string
  type: 'ingreso' | 'gasto'
  category: BusinessCategory //categoría del gasto
  description: string
  amount: number
}
