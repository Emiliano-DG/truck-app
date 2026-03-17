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
        .order('name', { ascending: true })

      if (error) throw error
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
