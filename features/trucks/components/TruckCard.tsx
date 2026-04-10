import { colors } from '@/constants/colors'
import { useDeleteTruck } from '@/hooks/useTrucks'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useRef } from 'react'
import {
  Alert,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { Truck } from '../../../types/truck'

export default function TruckCard({ item }: { item: Truck }) {
  const swipeableRef = useRef<Swipeable>(null)
  const { mutate: deleteTruck } = useDeleteTruck()

  const handleDelete = () => {
    swipeableRef.current?.close()
    Alert.alert(
      'Eliminar camión',
      `¿Estás seguro de que querés eliminar "${item.model}"? Se borrarán también sus movimientos.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () =>
            deleteTruck(Number(item.id), {
              onError: (error) => {
                Alert.alert('Error', `No se pudo eliminar: ${error.message}`)
              },
            }),
        },
      ],
    )
  }

  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    })

    return (
      <Pressable
        style={({ pressed }) => [
          styles.deleteContainer,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={handleDelete}
      >
        <Animated.View
          style={[styles.deleteButton, { transform: [{ scale }] }]}
        >
          <Ionicons name="trash" size={24} color="#fff" />
        </Animated.View>
      </Pressable>
    )
  }

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      overshootRight={false}
      friction={2}
    >
      <Pressable
        style={({ pressed }) => [styles.card, { opacity: pressed ? 0.7 : 1 }]}
        onPress={() =>
          router.push({ pathname: '/truck/[id]', params: { id: item.id } })
        }
      >
        <View style={styles.leftContent}>
          <Text style={styles.truckEmoji}>🚚</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.modelText}>{item.model}</Text>
            <Text style={styles.driverNameText}>{item.driverName}</Text>
          </View>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.primary.light}
        />
      </Pressable>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    padding: 20,
    borderRadius: 15,
    borderColor: colors.background.surface,
    borderWidth: 1,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // sombras para ios y android
    elevation: 3, // android
    shadowColor: '#000', // ios
    shadowOffset: { width: 0, height: 2 }, // ios
    shadowOpacity: 0.1, // ios
    shadowRadius: 4, // ios
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  truckEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  infoContainer: {
    justifyContent: 'center',
  },
  modelText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  driverNameText: {
    fontSize: 14,
    color: colors.text.muted,
    marginTop: 4,
  },
  deleteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginBottom: 12,
    borderRadius: 15,
  },
  deleteButton: {
    backgroundColor: colors.status.danger,
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 55,
    borderRadius: 30,
  },
})
