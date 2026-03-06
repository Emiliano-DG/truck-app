import { colors } from '@/constants/colors'
import { movementSchema } from '@/schemas/movementSchema'
import { Movement } from '@/types/truck'
import { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useTruckStore } from '../store/useTruckStore'
import ModalActions from './ModalActions'

interface AddMovementModalProps {
  visible: boolean
  onClose: () => void
  truckId: string
}

export function AddMovementModal({
  visible,
  onClose,
  truckId,
}: AddMovementModalProps) {
  const addMovement = useTruckStore((state) => state.addMovement)

  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'adelanto' as 'adelanto' | 'comision',
    date: new Date().toISOString().split('T')[0],
  })

  const [errors, setErrors] = useState('')

  const handleSave = () => {
    const result = movementSchema.safeParse(form)

    if (!result.success) {
      setErrors(result.error.issues[0].message)
      return
    }

    const newMovement: Movement = {
      id: Date.now().toString(),
      ...result.data,
    }

    addMovement(truckId, newMovement)

    setForm({
      description: '',
      amount: '',
      type: 'adelanto',
      date: new Date().toISOString().split('T')[0],
    })

    setErrors('')

    onClose()
  }

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>Agregar movimiento</Text>

              {/* Control de error de campos */}
              {errors && <Text style={styles.error}>{errors}</Text>}

              {/* Selector de tipo de movimiento (ingreso/comision) */}
              <View style={styles.typeSelector}>
                {/* Boton ingreso */}
                <Pressable
                  style={[
                    styles.typeBtn,
                    form.type === 'adelanto' && styles.typeBtnActiveIngreso,
                  ]}
                  onPress={() => setForm({ ...form, type: 'adelanto' })}
                >
                  <Text
                    style={[
                      styles.typeBtnText,
                      form.type === 'adelanto' && styles.textWhite,
                    ]}
                  >
                    Adelanto
                  </Text>
                </Pressable>

                {/* Boton comision */}
                <Pressable
                  style={[
                    styles.typeBtn,
                    form.type === 'comision' && styles.typeBtnActiveComision,
                  ]}
                  onPress={() => setForm({ ...form, type: 'comision' })}
                >
                  <Text
                    style={[
                      styles.typeBtnText,
                      form.type === 'comision' && styles.textWhite,
                    ]}
                  >
                    Comision
                  </Text>
                </Pressable>
              </View>
              {/* Input de descripcion */}
              <TextInput
                placeholder="Descripcion"
                placeholderTextColor={colors.text.muted}
                style={styles.input}
                value={form.description}
                onChangeText={(text) => setForm({ ...form, description: text })}
              />

              {/* Input de monto */}
              <TextInput
                placeholder="Monto $"
                placeholderTextColor={colors.text.muted}
                style={styles.input}
                keyboardType="numeric"
                value={form.amount}
                onChangeText={(amount) => setForm({ ...form, amount })}
              />

              {/* Input de fecha */}
              <TextInput
                placeholder="Fecha"
                style={styles.input}
                value={form.date}
                onChangeText={(date) => setForm({ ...form, date })}
              />

              <ModalActions onClose={onClose} handleSave={handleSave} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: colors.background.card,
    padding: 25,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    zIndex: 1000,
  },
  title: {
    color: colors.text.primary,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: colors.background.surface,
    borderRadius: 10,
    padding: 4,
  },
  typeBtn: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 8 },
  typeBtnActiveIngreso: { backgroundColor: colors.status.success },
  typeBtnText: { fontWeight: '600', color: colors.text.muted },
  textWhite: { color: 'white' },
  typeBtnActiveComision: {
    backgroundColor: colors.status.danger,
  },
  input: {
    backgroundColor: colors.background.surface,
    color: colors.text.primary,
    borderColor: colors.accent.main,
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  btnSaveText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
