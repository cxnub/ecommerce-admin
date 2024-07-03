import { createContext, useContext } from "react";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};
