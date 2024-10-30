export interface LoginData {
  username: string
  password: string
}
export interface UserData {
  name: string
  secondName: string
}

export interface AuthState {
  user: UserData | null
  accessToken: string | null
  refreshAccessToken: string | null
  roles:string[]|null
}

export type AuthActions =
  | {
      type: 'LOGIN'
      payload: {
        user: UserData
        accessToken: string
        refreshAccessToken: string
        roles:string[]
      }
    }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: UserData }
  | {
      type: 'REFRESH_TOKEN'
      payload: { accessToken: string }
    }
