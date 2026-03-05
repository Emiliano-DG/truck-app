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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            style={styles.modalContainer}
          >
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

            {/* Input de monto */}
            <TextInput
              placeholder="Monto $"
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

            {/* Input de descripcion */}
            <TextInput
              placeholder="Descripcion"
              style={styles.input}
              value={form.description}
              onChangeText={(text) => setForm({ ...form, description: text })}
            />
            <ModalActions onClose={onClose} handleSave={handleSave} />
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
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
    backgroundColor: 'white',
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
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    padding: 4,
  },
  typeBtn: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 8 },
  typeBtnActiveIngreso: { backgroundColor: colors.income },
  typeBtnText: { fontWeight: '600', color: '#8E8E93' },
  textWhite: { color: 'white' },
  typeBtnActiveComision: {
    backgroundColor: colors.expense,
  },
  input: {
    backgroundColor: '#F2F2F7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btnSave: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  btnCancel: {
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  btnCancelText: {
    color: colors.textLight,
    fontWeight: '600',
  },
  btnSaveText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
