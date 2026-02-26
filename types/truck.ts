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

export type ExpenseCategory = 'Combustible' | 'Seguro' | 'Taller' | 'Otros'

export interface GeneralExpense {
  id: string
  date: string
  category: ExpenseCategory //categoría del gasto
  description: string
  amount: number
}
