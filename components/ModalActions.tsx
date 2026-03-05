import { colors } from '@/constants/colors'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface ModalActionsProps {
  onClose: () => void
  handleSave: () => void
}

export default function ModalActions({
  onClose,
  handleSave,
}: ModalActionsProps) {
  return (
    <View style={styles.buttons}>
      <Pressable style={styles.btnCancel} onPress={onClose}>
        <Text style={styles.textBtnCancel}>Cancelar</Text>
      </Pressable>
      <Pressable style={styles.btnSave} onPress={handleSave}>
        <Text style={styles.textWhite}>Guardar</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
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
  textWhite: { color: colors.text.primary, fontWeight: 'bold' },
})
