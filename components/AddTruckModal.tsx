import { colors } from '@/constants/colors'
import { useAddTruck } from '@/hooks/useTrucks'
import React, { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native'
import { truckSchema } from '../schemas/truckSchema'
import ModalActions from './ModalActions'

export default function AddTruckModal({
  visible,
  onClose,
}: {
  visible: boolean
  onClose: () => void
}) {
  // Hook para agregar un nuevo camión a la base de datos y actualizar la cache automaticamente
  const { mutate: addTruck } = useAddTruck()

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
      model: form.model,
      driverName: form.driverName,
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
        <TouchableNativeFeedback onPress={Keyboard.dismiss}>
          <View style={styles.overlay}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Nuevo Camión 🚛</Text>
              {errors && <Text style={styles.error}>{errors}</Text>}
              <TextInput
                placeholder="Modelo"
                placeholderTextColor={colors.text.muted}
                onChangeText={(t) => setForm({ ...form, model: t })}
                style={styles.input}
              />
              <TextInput
                placeholder="Conductor"
                placeholderTextColor={colors.text.muted}
                onChangeText={(t) => setForm({ ...form, driverName: t })}
                style={styles.input}
              />

              <ModalActions onClose={onClose} handleSave={handleSave} />
            </View>
          </View>
        </TouchableNativeFeedback>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingBottom: 20, // 👈 espacio entre modal y teclado
  },
  modalContent: {
    backgroundColor: colors.background.surface,
    padding: 25,
    paddingBottom: 35,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30,
    color: colors.text.primary,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.background.card,
    color: colors.text.primary,
    borderColor: colors.accent.main,
    borderWidth: 1,
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
