import { colors } from '@/constants/colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface ScreenHeaderProps {
  title: string
  subtitle?: string
  icon?: string
}

export function ScreenHeader({ title, subtitle, icon }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.main,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
    borderBottomColor: colors.background.surface,
    borderBottomWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 40,
    marginRight: 14,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text.primary,
  },

  subtitle: {
    marginTop: 2,
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
  },
})
