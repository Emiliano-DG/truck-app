import AddTruckModal from '@/components/AddTruckModal'
import TruckCard from '@/components/TruckCard'
import { colors } from '@/constants/colors'
import { useTruckStore } from '@/store/useTruckStore'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { FlatList, Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function CamionesScreen() {
  //1. Cargamos los datos de los camiones (mockTrucks), luego vendra el backend
  // const [trucks] = useState<Truck[]>(MOCK_TRUCKS)
  const trucks = useTruckStore((state) => state.trucks)
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={trucks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TruckCard item={item} />}
        contentContainerStyle={styles.listPadding}
      />
      {/* Boton flotante para agregar nuevo camión */}
      <Pressable style={styles.fabButton} onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons name="plus" size={28} color="#fff" />
      </Pressable>
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
    backgroundColor: colors.background,
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
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 1000,
  },
})
