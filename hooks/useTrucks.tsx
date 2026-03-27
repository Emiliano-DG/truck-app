import { Truck } from '@/types/truck'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

// Para LEER los camiones
export function useReadTrucks() {
  return useQuery({
    queryKey: ['trucks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trucks')
        .select('*')
        .order('model', { ascending: true })

      if (error) {
        console.log('SUPABASE ERROR:', error)
        throw error
      }

      // if (error) throw error
      return data as Truck[]
    },
  })
}

// Para CREAR un camión nuevo
export function useAddTruck() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newTruck: { model: string; driverName: string }) => {
      const { data, error } = await supabase
        .from('trucks')
        .insert([newTruck])
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      // Refrescamos la lista de camiones automáticamente
      queryClient.invalidateQueries({ queryKey: ['trucks'] })
    },
  })
}

// Para LEER los movimientos de un camión
export function useTrckMovements(truckId: string | undefined) {
  return useQuery({
    // La queryKey incluye el truckId para que si cambias de camión, se refresque
    queryKey: ['truck-movements', truckId],
    queryFn: async () => {
      if (!truckId) return [] // Si no hay ID, devolvemos lista vacía
      const { data, error } = await supabase
        .from('movements')
        .select('*')
        .eq('truck_id', Number(truckId))
        .order('date', { ascending: false })

      if (error) throw error
      return data
    },
    enabled: !!truckId, // Solo se ejecuta si el ID existe
  })
}

// Para BORRAR un camión
export function useDeleteTruck() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (truckId: number) => {
      const { error } = await supabase.from('trucks').delete().eq('id', truckId)

      if (error) throw error
    },
    onSuccess: () => {
      // Refrescamos la lista de camiones automáticamente
      queryClient.invalidateQueries({ queryKey: ['trucks'] })
    },
  })
}
