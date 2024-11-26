import { api } from "@/data/apiMock";
import { setupAxiosInterceptors } from "@/interceptors/axiosInterceptor";
import { Role, User } from "@/interfaces/auth";
import { axiosInstance } from "@/lib/axios";
import { isTokenExpired } from "@/utils/utilities";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  login: (data: LoginFormData) => void;
  logout: () => void;
  refreshAccessTokenState: (newAccessToken: string) => void;
  hasPermission: (roles: Role[], resource: string, action: string) => boolean;
}
interface LoginFormData {
  username: string;
  password: string;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userState, setUserState] = useState<UserState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (userLogin: LoginFormData): Promise<UserState> => {
      setIsLoading(true);
      // const response = await axiosInstance.post("/auth/login", userLogin);
      const response = await api.login(userLogin.username, userLogin.password);
      return response;
      console.log(response);
      // return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      console.log(data);
      console.log(useContext);
      setUserState(data);
      setLocalStorageTokens(data);
      setIsLoading(false);
      queryClient.invalidateQueries({
        queryKey: ["userData"],
      });
    },
    onError: () => {
      setIsLoading(false);
      throw new Error("Login failed. Please try again.");
    },
  });

  const login = (data: LoginFormData) => {
    console.log("Login");
    console.log(data);
    loginMutation.mutate(data);
  };
  const logout = () => {
    localStorage.clear();
    delete axiosInstance.defaults.headers.common["Authorization"];
    setUserState(null);
  };
  const hasPermission = (
    roles: Role[],
    resource: string,
    action: string
  ): boolean => {
    return roles.some((role) =>
      role.permissions.some(
        (perm) => perm.resource === resource && perm.actions.includes(action)
      )
    );
  };
  const refreshAccessTokenState = async () => {
    try {
      console.log("Refrescar el token");
      /*    const response = await axiosInstance.post("/auth/refresh", {
        refreshToken: localStorage.getItem("refreshToken"),
      }); */
      //  const newAccessToken = response.data.accessToken;
      const newAccessToken =
        /* localStorage.getItem("refreshToken") + "refresh" */ "1000000";
      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
        console.log(userState);
        /* setUserState((prevState) =>
          prevState ? { ...prevState, accessToken: newAccessToken } : null
        ); */
        console.log(userState);
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
      }
    } catch (error) {
      throw new Error(" Fallo Refress Token.No se pude refrescar el token");
    }
  };

  // Persist session on app load
  useEffect(() => {
    try {
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedUserData = localStorage.getItem("userData");
      console.log(storedUserData);
      console.log(storedAccessToken);
      if (storedAccessToken && storedUserData) {
        const newUserState: UserState = JSON.parse(storedUserData);
        console.log(newUserState);
        setUserState(newUserState);
        console.log(userState);
        // const isExpired = isTokenExpired(storedAccessToken);
        // Utiliza la función de verificación de expiración
        /*  if (isExpired) {
         
          refreshAccessTokenState();
        } */
      }
      /*  setupAxiosInterceptors(refreshAccessTokenState, logout); // Configurar el interceptor */
    } catch (error) {
      logout();
    }
  }, []);
  const setLocalStorageTokens = (prueba: UserState) => {
    console.log(userState);
    const { user, accessToken, refreshAccessToken } = prueba;
    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    localStorage.setItem(
      "refreshAccessToken",
      JSON.stringify(refreshAccessToken)
    );
    /*  localStorage.setItem("rol", JSON.stringify(rol));
    localStorage.setItem("permission", JSON.stringify(permissions)); */
  };
  const values: AuthContextProps = {
    userState,
    login,
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
