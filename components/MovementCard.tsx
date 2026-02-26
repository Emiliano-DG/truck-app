import { Movement } from '@/types/truck'
import { StyleSheet, Text, View } from 'react-native'

export function MovementCard({ movement }: { movement: Movement }) {
  return (
    <View style={styles.moveItem}>
      <View>
        <Text style={styles.moveDesc}>{movement.description}</Text>
        <Text style={styles.moveDate}>{movement.date}</Text>
      </View>

      <Text
        style={[
          styles.moveAmount,
          { color: movement.type === 'adelanto' ? '#34C759' : '#FF3B30' },
        ]}
      >
        {movement.type === 'adelanto' ? '+' : '-'} ${movement.amount}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  moveItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  moveDesc: { fontSize: 16, fontWeight: '500' },
  moveDate: { fontSize: 16, fontWeight: '500' },
  moveAmount: { fontSize: 16, fontWeight: 'bold' },
})
