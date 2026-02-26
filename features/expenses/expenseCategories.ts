export const CATEGORIES = ['Combustible', 'Seguro', 'Taller', 'Otros'] as const

export type ExpenseCategory = (typeof CATEGORIES)[number]
