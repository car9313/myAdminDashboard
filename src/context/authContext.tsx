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
      // return response.data;
    },
    onSuccess: (data) => {
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
      /*    const response = await axiosInstance.post("/auth/refresh", {
        refreshToken: localStorage.getItem("refreshToken"),
      }); */
      //  const newAccessToken = response.data.accessToken;
      const newAccessToken = localStorage.getItem("refreshToken") + "refresh";
      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
        setUserState((prevState) =>
          prevState ? { ...prevState, accessToken: newAccessToken } : null
        );
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
      }
    } catch (error) {
      throw new Error("Token refresh failed");
    }
  };

  // Persist session on app load
  useEffect(() => {
    try {
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedUserData = localStorage.getItem("userData");
      if (storedAccessToken && storedUserData) {
        const isExpired = isTokenExpired(storedAccessToken);
        // Utiliza la función de verificación de expiración
        if (!isExpired) {
          setUserState(JSON.parse(storedUserData));
        } else {
          refreshAccessTokenState(); // Intentar renovar el token si ha expirad
        }
      }
      setupAxiosInterceptors(refreshAccessTokenState, logout); // Configurar el interceptor
    } catch (error) {
      logout();
    }
  }, []);
  const setLocalStorageTokens = (userState: UserState) => {
    const { user, accessToken, refreshAccessToken } = userState;
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
