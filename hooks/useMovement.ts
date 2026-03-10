import { supabase } from '@/lib/supabase'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
    mutationFn: async (newMovement) => {
      const { data, error } = await supabase
        .from('movements')
        .insert([newMovement])
        .select()
      if (error) {
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
