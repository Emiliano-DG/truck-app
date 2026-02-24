export interface Payment {
  id: string
  amount: number
  date: string
  description: string
}

export interface Truck {
  id: string
  model: string //nombre del camión
  driverName: string //nombre del conductor
  payments: Payment[] //historial de pagos
}

export interface GeneralExpense {
  id: string
  date: string
  category: 'combustible' | 'Seguro' | 'Taller' | 'Otros' //categoría del gasto
  description: string
  amount: number
}
