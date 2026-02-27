export const CATEGORIES = ['Combustible', 'Seguro', 'Taller', 'Otros'] as const

export type BusinessMovementCategory = (typeof CATEGORIES)[number]
