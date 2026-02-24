import { Truck } from '../types/truck'

export const MOCK_TRUCKS: Truck[] = [
  {
    id: '1',
    model: 'Scania R450',
    driverName: 'Juan Pérez',
    agreedSalary: 2000,
    payments: [
      {
        id: 't1',
        description: 'primer adelanto',
        amount: 500,
        date: '2026-02-10',
      },
      {
        id: 't2',
        description: 'segundo adelanto',
        amount: 1500,
        date: '2026-02-18',
      },
    ],
  },
  {
    id: '2',
    model: 'Volvo FH16',
    driverName: 'María López',
    agreedSalary: 2500,
    payments: [
      {
        id: 't3',
        description: 'primer adelanto',
        amount: 1000,
        date: '2026-02-15',
      },
    ],
  },
]
