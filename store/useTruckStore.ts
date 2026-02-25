import { MOCK_TRUCKS } from '@/data/mockTrucks'
import { create } from 'zustand'
import { Movement, Truck } from '../types/truck'

interface TruckState {
  trucks: Truck[]
  addTruck: (newTruck: Truck) => void
  addMovement: (truckId: string, movement: Movement) => void
  // removeTruck: (id: string) => void
  // updateTruck: (id: string, truck: Truck) => void
}

export const useTruckStore = create<TruckState>((set) => ({
  trucks: MOCK_TRUCKS, // Iniciamos con los datos de prueba

  //Agregar camion
  addTruck: (newTruck: Truck) =>
    set((state) => ({ trucks: [...state.trucks, newTruck] })),

  //Agregar movimiento (ingreso/comision)
  addMovement: (truckId: string, movement: Movement) =>
    set((state) => ({
      trucks: state.trucks.map((truck) =>
        truck.id === truckId
          ? { ...truck, movements: [...truck.movements, movement] }
          : truck,
      ),
    })),
  // removeTruck: (id: string) => set((state) => ({ trucks: state.trucks.filter((truck) => truck.id !== id) })),
  // updateTruck: (id: string, truck: Truck) => set((state) => ({ trucks: state.trucks.map((truck) => truck.id === id ? truck : truck) })),
}))
