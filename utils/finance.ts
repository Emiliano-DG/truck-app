import { BusinessMovement, Movement } from '@/types/truck'

// Calculo del balance para las comisiones de los camiones
export const calculateBalance = (movements: Movement[]) => {
  const adelanto = movements
    .filter((m) => m.type === 'adelanto')
    .reduce((acc, m) => acc + m.amount, 0)

  const comisiones = movements
    .filter((m) => m.type === 'comision')
    .reduce((acc, m) => acc + m.amount, 0)

  const balance = comisiones - adelanto
  return { balance, adelanto, comisiones }
}

// Calculo del balance para los gastos e ingresos generales
export const calculateBusinessBalance = (movements: BusinessMovement[]) => {
  const ingresos = movements
    .filter((m) => m.type === 'ingreso')
    .reduce((acc, m) => acc + m.amount, 0)

  const gastos = movements
    .filter((m) => m.type === 'gasto')
    .reduce((acc, m) => acc + m.amount, 0)

  const businessBalance = ingresos - gastos
  return { businessBalance, ingresos, gastos }
}
