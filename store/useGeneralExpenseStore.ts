import { MOCK_EXPENSES } from '@/data/mockExpenses'
import { GeneralExpense } from '@/types/truck'
import { create } from 'zustand'

interface GeneralExpenseState {
  expenses: GeneralExpense[]
  addExpense: (expense: GeneralExpense) => void
}

export const useGeneralExpenseStore = create<GeneralExpenseState>((set) => ({
  expenses: MOCK_EXPENSES,
  addExpense: (newExpense: GeneralExpense) =>
    set((state) => ({
      expenses: [newExpense, ...state.expenses],
    })),
}))
