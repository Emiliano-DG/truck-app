import { colors } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface FabButtonProps {
  onPress: () => void
  icon?: keyof typeof Ionicons.glyphMap
}

export const FabButton = ({ onPress, icon = 'add' }: FabButtonProps) => {
  const insets = useSafeAreaInsets()

  return (
    <Pressable
      style={[
        styles.fabButton,
        { bottom: 80 + insets.bottom / 2 }, // Ajuste para quedar arriba de las tabs (80px) + margen
      ]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={30} color={colors.background.main} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  fabButton: {
    position: 'absolute',
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
})
