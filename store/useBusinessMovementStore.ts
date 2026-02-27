import { MOCK_BUSINESS_MOVEMENTS } from '@/data/mockBusiness'
import { BusinessMovement } from '@/types/truck'
import { create } from 'zustand'

interface BusinessMovementState {
  movements: BusinessMovement[]
  addBusinessMovement: (movement: BusinessMovement) => void
}

export const useBusinessMovementStore = create<BusinessMovementState>(
  (set) => ({
    movements: MOCK_BUSINESS_MOVEMENTS,
    addBusinessMovement: (newMovement: BusinessMovement) =>
      set((state) => ({
        movements: [newMovement, ...state.movements],
      })),
  }),
)
