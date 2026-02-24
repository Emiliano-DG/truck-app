import { Truck } from '../types/truck'

export const MOCK_TRUCKS: Truck[] = [
  {
    id: '1',
    model: 'Scania R450',
    driverName: 'Juan Pérez',
    movements: [
      {
        id: 't1',
        type: 'comision',
        amount: 500,
        date: '2026-02-10',
        description: 'Viaje a Buenos Aires',
      },
      {
        id: 't2',
        type: 'comision',
        amount: 1500,
        date: '2026-02-18',
        description: 'Viaje a Rosario',
      },
      {
        id: 't3',
        type: 'ingreso',
        amount: 2000,
        date: '2026-02-20',
        description: 'Viaje a Córdoba',
      },
    ],
  },
  {
    id: '2',
    model: 'Volvo FH16',
    driverName: 'María López',
    movements: [
      {
        id: 't3',
        type: 'comision',
        amount: 500,
        date: '2026-02-15',
        description: 'Viaje a Córdoba',
      },
    ],
  },
]
