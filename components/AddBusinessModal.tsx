import { colors } from '@/constants/colors'
import { CATEGORIES } from '@/features/BusinessMovement/businessMovementCategory'
import { businessMovementSchema } from '@/features/BusinessMovement/businessMovementSchema'
import { useBusinessMovementStore } from '@/store/useBusinessMovementStore'

import { useState } from 'react'
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { BusinessCategory, BusinessMovement } from '../types/truck'

interface AddBusinessModalProps {
  visible: boolean
  onClose: () => void
}

export function AddBusinessModal({ visible, onClose }: AddBusinessModalProps) {
  const { addBusinessMovement } = useBusinessMovementStore((state) => state)

  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: 'Otros' as BusinessCategory,
    type: 'gasto' as 'gasto' | 'ingreso',
    date: new Date().toISOString().split('T')[0],
  })

  const [errors, setErrors] = useState('')

  // Función para guardar el gasto/ingreso
  const handleSave = () => {
    const result = businessMovementSchema.safeParse(form)

    if (!result.success) {
      setErrors(result.error.issues[0].message)
      return
    }

    const newMovement: BusinessMovement = {
      id: Date.now().toString(),
      ...result.data,
    }

    addBusinessMovement(newMovement)

    setForm({
      description: '',
      amount: '',
      category: 'Otros' as BusinessCategory,
      type: 'gasto' as 'gasto' | 'ingreso',
      date: new Date().toISOString().split('T')[0],
    })

    setErrors('')

    onClose()
  }

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}> Nuevo Gasto/Ingreso General 💸</Text>
          <Text style={styles.label}>Categoría</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.catScroll}
          >
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat}
                style={[
                  styles.catBtn,
                  form.category === cat && styles.catBtnActive,
                ]}
                onPress={() => setForm({ ...form, category: cat })}
              >
                <Text
                  style={[
                    styles.catText,
                    form.category === cat && styles.textWhite,
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.typeSelector}>
            {/* Boton ingreso */}
            <Pressable
              style={[
                styles.typeBtn,
                form.type === 'ingreso' && styles.typeBtnActiveIngreso,
              ]}
              onPress={() => setForm({ ...form, type: 'ingreso' })}
            >
              <Text
                style={[
                  styles.typeBtnText,
                  form.type === 'ingreso' && styles.textWhite,
                ]}
              >
                Ingreso
              </Text>
            </Pressable>

            {/* Boton comision */}
            <Pressable
              style={[
                styles.typeBtn,
                form.type === 'gasto' && styles.typeBtnActiveGasto,
              ]}
              onPress={() => setForm({ ...form, type: 'gasto' })}
            >
              <Text
                style={[
                  styles.typeBtnText,
                  form.type === 'gasto' && styles.textWhite,
                ]}
              >
                Gasto
              </Text>
            </Pressable>
          </View>

          <TextInput
            placeholder="Descripción"
            style={styles.input}
            value={form.description}
            onChangeText={(v) => setForm({ ...form, description: v })}
          />
          <TextInput
            placeholder="Monto $"
            style={styles.input}
            keyboardType="numeric"
            value={form.amount}
            onChangeText={(v) => setForm({ ...form, amount: v })}
          />
          <View style={styles.buttons}>
            <Pressable style={styles.btnCancel} onPress={onClose}>
              <Text>Cancelar</Text>
            </Pressable>
            <Pressable style={styles.btnSave} onPress={handleSave}>
              <Text style={styles.textWhite}>Guardar</Text>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    zIndex: 1000,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 14, color: '#8E8E93', marginBottom: 10 },
  catScroll: { flexDirection: 'row', marginBottom: 20 },
  catBtnActive: { backgroundColor: '#007AFF' },
  textWhite: { color: 'white', fontWeight: 'bold' },
  catBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    marginRight: 8,
    height: 40,
  },
  catText: { fontSize: 14, color: '#1C1C1E' },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    padding: 4,
  },
  typeBtn: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 8 },
  typeBtnActiveIngreso: { backgroundColor: colors.income },
  typeBtnActiveGasto: { backgroundColor: colors.expense },
  typeBtnText: { fontWeight: '600', color: '#8E8E93' },
  input: {
    backgroundColor: '#F2F2F7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
  btnSave: {
    backgroundColor: '#007AFF',
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
    backgroundColor: '#F2F2F7',
  },
})
