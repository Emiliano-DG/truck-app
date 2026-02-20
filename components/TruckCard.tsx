import { Link } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Truck } from '../types/truck'
import { calculateDriverBalance } from '../utils/finance'

export default function TruckCard({ item }: { item: Truck }) {
  const { remaining, status } = calculateDriverBalance(
    item.agreedSalary,
    item.payments,
  )
  return (
    <Link href={{ pathname: '/truck/[id]', params: { id: item.id } }} asChild>
      <Pressable style={styles.card}>
        <View>
          <Text style={styles.modelText}>{item.model}</Text>
          <Text style={styles.driverNameText}>{item.driverName}</Text>
        </View>
        {/* Indicador visual de que se puede entrar a ver mas */}
        {/* <Text style={styles.arrowText}>{'>'}</Text> */}

        <View>
          <Text
            style={{
              ...styles.balanceText,
              color: status === 'pagado' ? '#34c759' : '#ff3b30',
            }}
          >
            ${remaining.toLocaleString()}
          </Text>
          <Text style={styles.balanceLabel}>{status}</Text>
        </View>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  listPadding: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: 'row', // pone los textos y la flecha en linea
    justifyContent: 'space-between', // separa los textos de la flecha
    alignItems: 'center',
    // sombras para ios y android
    elevation: 3, // android
    shadowColor: '#000', // ios
    shadowOffset: { width: 0, height: 2 }, // ios
    shadowOpacity: 0.1, // ios
    shadowRadius: 4, // ios
  },
  modelText: {
    fontSize: 18,
    fontWeight: '600',
  },
  driverNameText: {
    fontSize: 14,
    color: '#8e8e93',
    marginTop: 4,
  },
  arrowText: {
    fontSize: 18,
    color: '#c7c7cc',
  },
  balanceText: {},
  balanceLabel: {},
})
