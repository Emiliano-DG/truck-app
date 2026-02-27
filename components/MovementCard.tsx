import { colors } from '@/constants/colors'
import { StyleSheet, Text, View } from 'react-native'

interface MovementCardProps {
  description: string
  date: string
  amount: number
  type: 'gasto' | 'ingreso' | 'adelanto' | 'comision'
  category?: string
}

export function MovementCard({
  description,
  date,
  amount,
  type,
  category,
}: MovementCardProps) {
  const isPositive = type === 'ingreso' || type === 'adelanto'
  return (
    <View style={styles.moveItem}>
      <View>
        {category && <Text style={styles.categoryBadge}>{category}</Text>}
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <Text
        style={[styles.amount, { color: isPositive ? '#34C759' : '#FF3B30' }]}
      >
        ${amount.toLocaleString('es-AR')}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  moveItem: {
    backgroundColor: colors.card,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  description: { fontSize: 16, fontWeight: '500' },
  date: { fontSize: 12, color: colors.textLight },
  amount: { fontSize: 18, fontWeight: 'bold', color: colors.expense },
})
