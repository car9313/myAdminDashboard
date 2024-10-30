import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useReducer,
} from 'react'
import { authReducer } from './authReducer'
import { AuthState, UserData } from '@/interfaces/authTypes'

interface AuthContextProps {
  state: AuthState
  createSession: (
    user: UserData,
    accessToken: string,
    refreshAccessToken: string,
    roles: string[]
  ) => void
  deleteSession: () => void
  isAuthenticated: () => boolean
  updateUser: (user: UserData) => void
  refreshAccessTokenState: (newAccessToken: string) => void
  hasRole: (role: string) => boolean
}

const initialUserSession: UserData | null =
  JSON.parse(sessionStorage.getItem('userSession') as string) !== ''
    ? JSON.parse(sessionStorage.getItem('userSession') as string)
    : null
// TODO revisar la persistencia de los token y los roles
export const AUTH_INITIAL_STATE: AuthState = {
  user: initialUserSession,
  accessToken: null,
  refreshAccessToken: null,
  roles: null,
}
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

  const createSession = useCallback(
    async (
      user: UserData,
      accessToken: string,
      refreshAccessToken: string,
      roles: string[]
    ) => {
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          accessToken,
          refreshAccessToken,
          roles,
        },
      })
      setsessionStorageTokens(user, accessToken, refreshAccessToken)
    },
    []
  )
  const deleteSession = useCallback(() => {
    console.log('LOGOUT')
    dispatch({ type: 'LOGOUT' })
    clearAuthsessionStorage()
  }, [])
  const isAuthenticated = () => {
    // de momento solo voy a preguntar si el access token existe
    // pendiente preguntar por la valides del token
    return sessionStorage.getItem('accessToken') ? true : false
  }
  /* const isAccessTokenExpired=(accessToken:string):boolean=>{
  // preguntar por el tiempo del token (si su tiempo es valido retornar true)
  // si no lo cumple intentar refrescarlo (si se puede refrescar actualizar el local storage) actualizar la session del usuario y devolver true
    return true
  } */

  /*    const isAccessTokenExpired=(accessToken:string):boolean=>{
    if(!accessToken) return true;
    try{
   const decodeToken=jwtDecode(accessToken)
   const currentTime= Date.now()/1000;
   if(!decodeToken.exp)
    return  true
  return decodeToken.exp >currentTime
    }catch(err){
    throw new Error(`Error decodificando el token | ${error}`)
    }
    return true
    } */
  const updateUser = useCallback(
    (user: UserData) => dispatch({ type: 'UPDATE_USER', payload: user }),
    []
  )
  const refreshAccessTokenState = useCallback(
    async (newAccessToken: string) => {
      dispatch({
        type: 'REFRESH_TOKEN',
        payload: { accessToken: newAccessToken },
      })
      sessionStorage.setItem('accessToken', newAccessToken)
    },
    []
  )
  const hasRole = (role: string): boolean => {
    if (state.roles) {
      return state.roles?.includes(role)
    }
    return false
  }

  const setsessionStorageTokens = (
    userSession: UserData,
    accessToken: string,
    refreshAccessToken: string
  ) => {
    sessionStorage.setItem('userSession', JSON.stringify(userSession))
    sessionStorage.setItem('accessToken', accessToken)
    sessionStorage.setItem('refreshAccessToken', refreshAccessToken)
  }
  const clearAuthsessionStorage = () => {
    sessionStorage.removeItem('userSession')
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('refreshAccessToken')
  }
  /*   useEffect(() => {
    // Recuerda usar `JSON.stringify` para convertir un objeto en cadena con formato JSON.
  console.log(state.user)
    sessionStorage.setItem('userSession', JSON.stringify(state.user));
    console.log(JSON.stringify(state.user));
  }, [state.user]);   */

  /* useEffect(() => {
    console.log('Prueba')
    const storedAccessToken = sessionStorage.getItem('accessToken')
    const storedRefreshAccessToken = sessionStorage.getItem('refreshAccessToken')
    if (!storedAccessToken || !storedRefreshAccessToken) return
    login({ username: 'claudia', password: 'claudia@gmail.com' })
  }, []) */

  const value = useMemo(
    () => ({
      state,
      createSession,
      deleteSession,
      isAuthenticated,
      updateUser,
      refreshAccessTokenState,
      hasRole,
    }),
    [state, createSession, deleteSession, updateUser, refreshAccessTokenState]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
