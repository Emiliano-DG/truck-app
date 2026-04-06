import { FabButton } from '@/components/FabButton'
import { LoadingView } from '@/components/LoadingView'
import { colors } from '@/constants/colors'
import AddTruckModal from '@/features/trucks/components/AddTruckModal'
import TruckCard from '@/features/trucks/components/TruckCard'
import { useReadTrucks } from '@/hooks/useTrucks'
import { useState } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function CamionesScreen() {
  const { data: trucks, isLoading, isError } = useReadTrucks()
  const [modalVisible, setModalVisible] = useState(false)

  if (isLoading) return <LoadingView />
  if (isError)
    return (
      <Text style={styles.error}>
        No pudimos cargar los camiones, intente nuevamente..
      </Text>
    )

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={trucks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TruckCard item={item} />}
        contentContainerStyle={styles.listPadding}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay camiones registrados</Text>
        }
      />
      {/* Boton flotante para agregar nuevo camión */}
      <FabButton onPress={() => setModalVisible(true)} />
      {/* Modal de Agregar */}
      <AddTruckModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text.primary,
    paddingHorizontal: 20,
  },
  listPadding: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 110, // Para evitar que el último elemento quede bajo las pestañas
  },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#8E8E93' },
  error: { textAlign: 'center', marginTop: 50, color: 'red' },
})
