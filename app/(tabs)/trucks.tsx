import TruckCard from '@/components/TruckCard'
import { colors } from '@/constants/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react'
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { MOCK_TRUCKS } from '../../data/mockTrucks'
import { Truck } from '../../types/truck'

export default function CamionesScreen() {
  //1. Cargamos los datos de los camiones (mockTrucks), luego vendra el backend
  const [trucks] = useState<Truck[]>(MOCK_TRUCKS)
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={trucks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TruckCard item={item} />}
          contentContainerStyle={styles.listPadding}
        />
        {/* Boton flotante para agregar nuevo camión */}
        <Pressable
          style={styles.fabButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialCommunityIcons name="plus" size={28} color="#fff" />
        </Pressable>
        {/* Modal de Agregar */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <View style={{ backgroundColor: 'white', padding: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                Hola soy el modal 🚛
              </Text>

              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={{ color: colors.primary, fontWeight: 'bold' }}>
                  Cerrar
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
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
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
})
