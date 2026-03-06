import AddTruckModal from '@/components/AddTruckModal'
import { FabButton } from '@/components/FabButton'
import { ScreenHeader } from '@/components/ScreenHeader'
import TruckCard from '@/components/TruckCard'
import { colors } from '@/constants/colors'
import { useTruckStore } from '@/store/useTruckStore'
import { useState } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function CamionesScreen() {
  //1. Cargamos los datos de los camiones (mockTrucks), luego vendra el backend
  // const [trucks] = useState<Truck[]>(MOCK_TRUCKS)
  const trucks = useTruckStore((state) => state.trucks)
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Camiones"
        subtitle="Lista de camiones disponibles"
        icon="🚚"
      />
      {/* <Text style={styles.title}>Camiones 🚚</Text> */}
      <FlatList
        data={trucks}
        keyExtractor={(item) => item.id}
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
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  fabButton: {
    position: 'absolute',
    bottom: 50,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.background.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 1000,
  },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#8E8E93' },
})
