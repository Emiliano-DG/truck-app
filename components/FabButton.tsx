import { colors } from '@/constants/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable, StyleSheet } from 'react-native'

interface FabButtonProps {
  onPress: () => void
  icon?: keyof typeof MaterialCommunityIcons.glyphMap
}

export const FabButton = ({ onPress, icon = 'plus' }: FabButtonProps) => {
  return (
    <Pressable style={styles.fabButton} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={30} color="white" />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  fabButton: {
    position: 'absolute',
    bottom: 45,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 1000,
  },
})
