import { createContext, useContext } from "react";
import { loginData, registerData } from "../shared/presentation/components/auth/AuthProvider";
import { UserEntity } from "../features/auth/domain/entities/User.entity";

interface AuthContextType {
  token: string | null;
  user: UserEntity | null;
  login: (data: loginData) => Promise<UserEntity>;
  register: (data: registerData) => Promise<UserEntity>;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};
