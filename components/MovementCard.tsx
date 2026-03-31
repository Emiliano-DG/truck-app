import { colors } from '@/constants/colors'
import { formatDate } from '@/utils/formatDate'
import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface MovementCardProps {
  description: string
  date: string
  amount: number
  type: 'gasto' | 'ingreso' | 'adelanto' | 'comision'
  category?: string
  showOptions?: boolean
  onOptionsPress?: () => void
}

export default function MovementCard({
  description,
  date,
  amount,
  type,
  category,
  showOptions = false,
  onOptionsPress,
}: MovementCardProps) {
  const isPositive = type === 'ingreso' || type === 'adelanto'
  const sign = isPositive ? '+' : '-'

  const formattedDate = formatDate(date)

  return (
    <View style={styles.expenseItem}>
      <View style={{ flex: 1, marginRight: 10 }}>
        {category && <Text style={styles.categoryBadge}>{category}</Text>}
        <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
          {description}
        </Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text
          style={[
            styles.amount,
            {
              color: isPositive ? colors.status.success : colors.status.danger,
            },
          ]}
        >
          {sign} ${amount.toLocaleString('es-AR')}
        </Text>

        {/* Boton  para  eliminar el gasto */}
        {showOptions && onOptionsPress && (
          <Pressable onPress={onOptionsPress} style={styles.optionsBtn}>
            <Ionicons
              name="trash-outline"
              size={18}
              color={colors.accent.main}
            />
          </Pressable>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  expenseItem: {
    backgroundColor: colors.background.card,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.background.surface,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  categoryBadge: {
    fontSize: 10,
    color: colors.accent.light,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  description: { fontSize: 16, fontWeight: '500', color: colors.text.primary },
  date: { fontSize: 11, color: colors.text.muted, marginTop: 2 },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.status.success,
    marginRight: 14,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: colors.background.surface,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  optionsBtn: {
    paddingLeft: 14,
    borderLeftWidth: 1,
    borderLeftColor: colors.background.surface,
  },
})
