export const formatDate = (dateString: string) => {
  if (!dateString) return ''

  // Dividimos el string por el guion
  const [year, month, day] = dateString.split('-')

  // Lo rearmamos en el orden que queremos
  return `${day}-${month}-${year}`
}
