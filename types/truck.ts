export interface Movement {
  id: string
  type: 'ingreso' | 'comision'
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

export interface GeneralExpense {
  id: string
  date: string
  category: 'combustible' | 'Seguro' | 'Taller' | 'Otros' //categoría del gasto
  description: string
  amount: number
}
