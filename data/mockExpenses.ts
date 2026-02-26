import { GeneralExpense } from '@/types/truck'

export const MOCK_EXPENSES: GeneralExpense[] = [
  {
    id: '1',
    date: '2022-01-01',
    category: 'combustible',
    description: 'Diésel',
    amount: 100,
  },
  {
    id: '2',
    date: '2022-01-02',
    category: 'Seguro',
    description: 'Seguro de vida',
    amount: 200,
  },
  {
    id: '3',
    date: '2022-01-03',
    category: 'Taller',
    description: 'Arreglo de motor',
    amount: 300,
  },
  {
    id: '4',
    date: '2022-01-04',
    category: 'Otros',
    description: 'Lavado de camión',
    amount: 400,
  },
]
