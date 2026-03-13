import { colors } from '@/constants/colors'
import { CATEGORIES } from '@/features/BusinessMovement/businessMovementCategory'
import { businessMovementSchema } from '@/features/BusinessMovement/businessMovementSchema'

import { useAddMovement } from '@/hooks/useMovement'
import { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native'
import ModalActions from './ModalActions'

interface AddBusinessModalProps {
  visible: boolean
  onClose: () => void
}

type FormType = {
  description: string
  amount: string
  type: 'gasto' | 'ingreso'
  category:
    | (typeof CATEGORIES)['gasto'][number]
    | (typeof CATEGORIES)['ingreso'][number]
  date: string
}

export function AddBusinessModal({ visible, onClose }: AddBusinessModalProps) {
  // const { addBusinessMovement } = useBusinessMovementStore((state) => state)

  //Hook para agregar movimiento a la base de datos y actualizar la cache automaticamente
  const { mutate: addMovement, isPending } = useAddMovement()

  // Estado para el formulario
  const [form, setForm] = useState<FormType>({
    description: '',
    amount: '',
    category: CATEGORIES.gasto[0],
    type: 'gasto' as 'gasto' | 'ingreso',
    date: new Date().toISOString().split('T')[0],
  })

  const [errors, setErrors] = useState('')

  // Función para guardar el gasto/ingreso
  const handleSave = () => {
    console.log('Intentando guardar:', form) // <--- AGREGÁ ESTO
    const result = businessMovementSchema.safeParse(form)

    if (!result.success) {
      setErrors(result.error.issues[0].message)
      return
    }

    const newMovement = {
      description: result.data.description,
      amount: Number(result.data.amount),
      category: result.data.category,
      type: result.data.type,
      date: result.data.date,
      truck_id: null, // Es un movimiento general, no asociado a un camión
    }

    addMovement(newMovement, {
      onSuccess: () => {
        // Solo reseteamos el formulario y cerramos el modal si la mutación fue exitosa,
        setForm({
          description: '',
          amount: '',
          category: CATEGORIES.gasto[0],
          type: 'gasto' as 'gasto' | 'ingreso',
          date: new Date().toISOString().split('T')[0],
        })
        setErrors('')
        onClose()
      },
      onError: (error) => {
        setErrors(error.message)
      },
    })
  }

  // Función para cambiar el tipo de movimiento (gasto o ingreso) y actualizar las categorías disponibles
  const handleChangeType = (newType: 'gasto' | 'ingreso') => {
    setForm((prev) => ({
      ...prev,
      type: newType,
      category: CATEGORIES[newType][0],
    }))
  }

  const categories = CATEGORIES[form.type]

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableNativeFeedback onPress={Keyboard.dismiss}>
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <View style={styles.typeSelector}>
                {/* Boton ingreso */}
                <Pressable
                  style={[
                    styles.typeBtn,
                    form.type === 'ingreso' && styles.typeBtnActiveIngreso,
                  ]}
                  onPress={() => handleChangeType('ingreso')}
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
                  onPress={() => handleChangeType('gasto')}
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

              <Text style={styles.label}>Categoría</Text>

              {/* Mostramos las categorias segun el tipo seleccionado */}

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.catScroll}
              >
                {categories.map((cat) => (
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
                        form.category === cat && styles.textCard,
                      ]}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>

              <TextInput
                placeholder="Descripción"
                placeholderTextColor={colors.text.muted}
                style={styles.input}
                value={form.description}
                onChangeText={(v) => setForm({ ...form, description: v })}
              />
              <TextInput
                placeholder="Monto $"
                placeholderTextColor={colors.text.muted}
                style={styles.input}
                keyboardType="numeric"
                value={form.amount}
                onChangeText={(v) => setForm({ ...form, amount: v })}
              />
              <TextInput
                style={styles.input}
                value={form.date}
                onChangeText={(v) => setForm({ ...form, date: v })}
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.background.surface,
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
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 25,
    color: colors.text.primary,
  },
  label: {
    fontSize: 15,
    color: colors.text.primary,
    marginBottom: 15,
    fontWeight: '600',
  },
  catScroll: { flexDirection: 'row', marginBottom: 20 },
  catBtnActive: { backgroundColor: colors.primary.soft },
  textCard: { color: colors.background.card, fontWeight: 'bold' },
  textWhite: { color: colors.text.primary, fontWeight: 'bold' },
  catBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.background.card,
    marginRight: 8,
    height: 40,
  },
  catText: { fontSize: 14, color: colors.text.secondary },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: colors.background.card,
    borderRadius: 10,
    padding: 4,
  },
  typeBtn: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 8 },
  typeBtnActiveIngreso: { backgroundColor: colors.status.success },
  typeBtnActiveGasto: { backgroundColor: colors.status.danger },
  typeBtnText: { fontWeight: '600', color: colors.text.secondary },
  input: {
    backgroundColor: colors.background.card,
    color: colors.text.primary,
    borderColor: colors.accent.main,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
  },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
  btnSave: {
    backgroundColor: colors.background.main,
    color: colors.text.primary,
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
  },
  btnCancel: {
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background.card,
  },
  textBtnCancel: { color: colors.text.secondary, fontWeight: '600' },
})
