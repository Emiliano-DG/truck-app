import React, { useState } from 'react'
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { truckSchema } from '../schemas/truckSchema'
import { useTruckStore } from '../store/useTruckStore'

export default function AddTruckModal({
  visible,
  onClose,
}: {
  visible: boolean
  onClose: () => void
}) {
  // Traemos la funcion addTruck del store
  const addTruck = useTruckStore((state) => state.addTruck)

  // Estado para guardar los datos del formulario
  const [form, setForm] = useState({
    model: '',
    driverName: '',
  })

  // Estado para guardar los errores del formulario
  const [errors, setErrors] = useState<string | null>(null)

  // Funcion para guardar el nuevo camión
  const handleSave = () => {
    const result = truckSchema.safeParse(form)

    if (!result.success) {
      setErrors(result.error.issues[0].message)
      return
    }

    addTruck({
      id: Math.random().toString(36).substring(7), //id temporal
      model: form.model,
      driverName: form.driverName,
      movements: [],
    })

    //Limpiamos el formulario
    setErrors(null)
    setForm({ model: '', driverName: '' })
    onClose()
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Nuevo Camión 🚛</Text>
          {errors && <Text style={styles.error}>{errors}</Text>}
          <TextInput
            placeholder="Modelo"
            onChangeText={(t) => setForm({ ...form, model: t })}
            style={styles.input}
          />
          <TextInput
            placeholder="Conductor"
            onChangeText={(t) => setForm({ ...form, driverName: t })}
            style={styles.input}
          />

          <View style={styles.buttonContainer}>
            <Pressable style={[styles.btn, styles.btnCancel]} onPress={onClose}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </Pressable>
            <Pressable
              style={[styles.btn, styles.btnSave]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    backgroundColor: '#F2F2F7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btn: {
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    cursor: 'pointer',
  },
  btnSave: { backgroundColor: '#007AFF' },
  btnCancel: { backgroundColor: '#FFE5E5' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  error: {
    color: 'red',
    marginBottom: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
})
