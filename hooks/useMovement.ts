import { supabase } from '@/lib/supabase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Alert } from 'react-native'
import 'react-native-url-polyfill/auto'

// Definimos la estructura exacta que espera Supabase
export interface MovementInsert {
  description: string
  amount: number
  type: 'gasto' | 'ingreso' | 'adelanto' | 'comision'
  category: string
  date: string
  truck_id: number | null
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

// Funcion para BORRAR un movimiento (Gasto General)
export function useDeleteBusinessMovement() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('movements').delete().eq('id', id) // Filtramos por el ID del movimiento

      if (error) throw error
    },
    onSuccess: () => {
      // Al borrar con éxito, le avisamos a TanStack Query que refresque la lista
      queryClient.invalidateQueries({ queryKey: ['business-movements'] })
    },
    onError: (error: any) => {
      Alert.alert(
        'Error al eliminar',
        'Hubo un problema con la base de datos: ' + error.message,
      )
    },
  })
}
