import { Movement } from '@/types/truck'

export const calculateBalance = (movements: Movement[]) => {
  const ingresos = movements
    .filter((m) => m.type === 'ingreso')
    .reduce((acc, m) => acc + m.amount, 0)

  const comisiones = movements
    .filter((m) => m.type === 'comision')
    .reduce((acc, m) => acc + m.amount, 0)

  const balance = ingresos - comisiones
  return { balance, ingresos, comisiones }
}
