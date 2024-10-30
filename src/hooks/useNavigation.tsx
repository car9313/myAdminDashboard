import { useContext } from 'react'
import { NavigationContext } from 'react-day-picker'

// Hook para acceder al contexto
export const useNavigation = () => {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
