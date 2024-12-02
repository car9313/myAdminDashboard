import { toast } from "@/components/ui/use-toast";
import { api } from "@/data/apiMock";
import { setupAxiosInterceptors } from "@/interceptors/axiosInterceptor";
import { Role, User } from "@/interfaces/auth";
import { axiosInstance } from "@/lib/axios";
import { isTokenExpired } from "@/utils/utilities";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface UserState {
  user: User;
  accessToken: string;
  refreshAccessToken: string;
}
interface AuthContextProps {
  userState: UserState | null;
  loginMutation: UseMutationResult<UserState, Error, LoginFormData, unknown>;
  isLoaded: boolean;
  logout: () => void;
  refreshAccessTokenState: (newAccessToken: string) => void;
  hasPermission: (roles: Role[], resource: string, action: string[]) => boolean;
}
interface LoginFormData {
  username: string;
  password: string;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userState, setUserState] = useState<UserState | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (userLogin: LoginFormData): Promise<UserState> => {
      // const response = await axiosInstance.post("/auth/login", userLogin);
      const response = await api.login(userLogin.username, userLogin.password);
      return response;
      // return response.data;
    },
    onSuccess: (data) => {
      // Configurar token manualmente para solicitudes inmediatas
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${data.accessToken}`;
      // Configurar estado del usuario
      setUserState(data);
      setSessionlStorage(data);
      // Configurar interceptor para manejar tokens globalmente
      setupAxiosInterceptors(refreshAccessTokenState, logout);
      setIsLoaded(true);
      queryClient.invalidateQueries({
        queryKey: ["userData"],
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Login failed. Please try again.",
      });
      /*  throw new Error("Login failed. Please try again."); */
    },
  });

  const logout = () => {
    sessionStorage.clear();
    delete axiosInstance.defaults.headers.common["Authorization"];
    setUserState(null);
  };
  const hasPermission = (
    roles: Role[],
    resource: string,
    actions: string[]
  ): boolean => {
    return roles.some((role) =>
      role.permissions.some(
        (perm) =>
          perm.resource === resource &&
          actions.every((action) => perm.actions.includes(action))
      )
    );
  };
  // Función para refrescar el token
  const refreshAccessTokenState = async (): Promise<void> => {
    try {
      const response = await axiosInstance.post("/auth/refresh", {
        refreshToken: sessionStorage.getItem("refreshToken"),
      });
      const newAccessToken = response.data.accessToken;
      if (newAccessToken) {
        sessionStorage.setItem("accessToken", newAccessToken);
        setUserState((prevState) =>
          prevState ? { ...prevState, accessToken: newAccessToken } : null
        );
        //axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
      } else {
        throw new Error("Token refresh is null");
      }
    } catch (error) {
      throw new Error("Token refresh failed");
    }
  };

  // Función para restaurar el estado del usuario desde SessionStorage
  const restoreUserSession = async () => {
    try {
      const storedAccessToken = sessionStorage.getItem("accessToken");
      const storedUserData = sessionStorage.getItem("userData");
      if (storedAccessToken && storedUserData) {
        //preguntar por el tiempo de valides del token
        const isExpired = isTokenExpired(storedAccessToken); // Función para validar expiración;
        if (!isExpired) {
          setUserState({
            user: JSON.parse(storedUserData),
            accessToken: JSON.parse(storedAccessToken),
            refreshAccessToken:
              sessionStorage.getItem("refreshAccessToken") || "",
          });
        } else {
          await refreshAccessTokenState(); // Renueva el token si es posible
        }
        setupAxiosInterceptors(refreshAccessTokenState, logout);
      } else {
        console.log(" Persist session on app load (Logout)");
        logout();
      }
      setIsLoaded(true); // Asegurarnos de que la carga termine
      // Marca que los datos fueron cargados
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to restore session. Please log in again.",
      });
      logout();
    }
  };
  useEffect(() => {
    restoreUserSession();
  }, []);
  const setSessionlStorage = (userState: UserState) => {
    const { user, accessToken, refreshAccessToken } = userState;
    sessionStorage.setItem("userData", JSON.stringify(user));
    sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
    sessionStorage.setItem(
      "refreshAccessToken",
      JSON.stringify(refreshAccessToken)
    );
  };
  const values: AuthContextProps = {
    userState,
    loginMutation,
    isLoaded,
    logout,
    refreshAccessTokenState,
    hasPermission,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
