import { BusinessMovement } from '@/types/truck'

export const MOCK_BUSINESS_MOVEMENTS: BusinessMovement[] = [
  {
    id: '1',
    date: '2022-01-01',
    type: 'ingreso',
    category: 'Otros',
    description: 'Viaje a Córdoba',
    amount: 100,
  },
  {
    id: '2',
    date: '2022-01-02',
    type: 'gasto',
    category: 'Seguro',
    description: 'Seguro de vida',
    amount: 200,
  },
]
