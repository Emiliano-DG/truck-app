import { expenseSchema } from '@/schemas/expenseSchema'
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
import { ExpenseCategory } from '../types/truck'

interface AddExpenseModalProps {
  visible: boolean
  onClose: () => void
}

const CATEGORIES: ExpenseCategory[] = [
  'Combustible',
  'Seguro',
  'Taller',
  'Otros',
]

export function AddExpenseModal({ visible, onClose }: AddExpenseModalProps) {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Otros' as ExpenseCategory,
  })

  const [errors, setErrors] = useState('')

  const handleSave = () => {
    const result = expenseSchema.safeParse(form)

    if (!result.success) {
      setErrors(result.error.issues[0].message)
      return
    }

    // const newExpense: GeneralExpense = {
    //   id: Date.now().toString(),
    //   ...result.data,

    // }

    // AddExpenseModal(newExpense)

    // setForm({
    //   description: '',
    //   amount: '',
    //   date: new Date().toISOString().split('T')[0],
    // })

    // setErrors('')

    // onClose()
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
