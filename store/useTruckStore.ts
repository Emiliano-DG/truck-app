import { MOCK_TRUCKS } from '@/data/mockTrucks'
import { create } from 'zustand'
import { Truck } from '../types/truck'

interface TruckState {
  trucks: Truck[]
  addTruck: (newTruck: Truck) => void
  // removeTruck: (id: string) => void
  // updateTruck: (id: string, truck: Truck) => void
}

export const useTruckStore = create<TruckState>((set) => ({
  trucks: MOCK_TRUCKS, // Iniciamos con los datos de prueba
  addTruck: (newTruck: Truck) =>
    set((state) => ({ trucks: [...state.trucks, newTruck] })),
  // removeTruck: (id: string) => set((state) => ({ trucks: state.trucks.filter((truck) => truck.id !== id) })),
  // updateTruck: (id: string, truck: Truck) => set((state) => ({ trucks: state.trucks.map((truck) => truck.id === id ? truck : truck) })),
}))
