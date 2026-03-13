import { supabase } from '@/lib/supabase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import 'react-native-url-polyfill/auto'

// Definimos la estructura exacta que espera Supabase
export interface MovementInsert {
  description: string
  amount: number
  type: 'gasto' | 'ingreso'
  category: string
  date: string
  truck_id: string | null
}

//Funcion para TRAER los movimientos (Gastos Generales)
export function useMovement() {
  return {
    queryKey: ['business-movements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('movements')
        .select('*')
        .is('truck_id', null) // solo los que No son de un camion
        .order('date', { ascending: false })
      if (error) {
        throw new Error(error.message)
      }
      return data || []
    },
  }
}

//Funcion para AGREGAR un movimiento (Gasto General)
export function useAddMovement() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newMovement: MovementInsert) => {
      const { data, error } = await supabase
        .from('movements')
        .insert([newMovement])
        .select()
      if (error) {
        console.error('ERROR DE SUPABASE:', error.message)
        throw new Error(error.message)
      }
      return data[0] // Devuelve el movimiento recién creado
    },
    onSuccess: () => {
      // Esto hace que la lista de movimientos se actualice automáticamente después de agregar uno nuevo
      queryClient.invalidateQueries({ queryKey: ['business-movements'] })
    },
  })
}
