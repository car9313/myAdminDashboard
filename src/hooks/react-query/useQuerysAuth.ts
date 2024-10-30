import { useMutation } from '@tanstack/react-query'
import { loginService } from '../../services/auth/index'

export const useQueryLogin = () => {
  return useMutation({
    mutationFn: (loginData: { username: string; password: string }) =>
      loginService(loginData),
  })
}
