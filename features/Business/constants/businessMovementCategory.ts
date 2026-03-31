export const CATEGORIESGASTOS = [
  'Combustible',
  'Seguro',
  'Taller',
  'Comisiones',
  'Otros',
] as const

export const CATEGORIASINGRESOS = ['Viajes', 'Otros'] as const

export type IngresoCategory = (typeof CATEGORIASINGRESOS)[number]

export type GastoCategory = (typeof CATEGORIESGASTOS)[number]

export const CATEGORIES = {
  gasto: CATEGORIESGASTOS,
  ingreso: CATEGORIASINGRESOS,
} as const
