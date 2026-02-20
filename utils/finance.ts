import { Payment } from '../types/truck'

export const calculateDriverBalance = (
  agreedSalary: number,
  payments: Payment[],
) => {
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0)
  const remaining = agreedSalary - totalPaid
  const status = remaining <= 0 ? 'pagado' : 'pendiente'

  return {
    totalPaid,
    remaining,
    status,
  }
}
