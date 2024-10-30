import { AuthState, LoginData } from '@/interfaces/authTypes'
import { axiosInstance } from '@/lib/axios'

export const loginService = async (loginData: LoginData) => {
  try {
    const response = await axiosInstance.post('/login', {
      loginData,
    })
    const data = await response.data.json()
    return data
  } catch (err) {
    throw new Error('Error | ' + err)
  }
}

export const loginServicePrueba = (loginData: LoginData): AuthState | null => {
  if (loginData.username === 'calfonso' && loginData.password === '12345678') {
    const response: AuthState = {
      user: { name: 'Claudia', secondName: 'Alfonso' },
      accessToken: '123123123123',
      refreshAccessToken: '456456456456',
      roles: ['admin'],
    }
    return response
  } else {
    return null
  }
}

export const getAccessRefreshToken = async (refreshAccessToken: string) => {
  /* 
 Request
 {
    "action":"authorize",
    "grant_type":"refresh_token",
    "username":"commerce@email.com",
    "refresh_token":" OqLWq5BoSm3ZHbfaY_D3J_XuKB1TOdrHl7Ui_0sdLF1",
    "audience":"https://api.dev.alignet.io",
    "client_id":"yhaPE3jtHXHMKUZBBFr9QS1x1FaXxr",
    "client_secret":"uTCetT3d4T-1NgXyTO66C0850xLJ5c7CwoyXm23NALxZ-MbwQxkqs1Q9ThwWfE",
    "scope":"create:token"
 }
    Response
 {
   "action":"authorize",
   "success":true,
   "access_token":"eyJhbGciOiJSUzI1NsInR5cCI6IkpXVCIsImtpZCI6IlVfR2ZLY.........",
   "scope":"create:token",
   "expires_in":86400,
   "token_type":"Bearer",
   "authorization":{
      "meta":{
         "status":{
            "code":"00",
            "message_ilgn":[
               {
                  "locale":"es_PE",
                  "value":"Access Token creado"
               }
            ]
         }
      }
   }
}   
 */

  try {
    const response = await axiosInstance.post('/refresh-token', {
      refreshAccessToken,
    })
    const data = await response.data.json()
    const newAccessToken = data.accessToken
    /* // Invalidar queries para que se reintenten con el nuevo token
 queryClient.invalidateQueries(); // Esto forzará a React Query a */
    return newAccessToken
  } catch (err) {
    throw new Error('Error | ' + err)
  }
}
