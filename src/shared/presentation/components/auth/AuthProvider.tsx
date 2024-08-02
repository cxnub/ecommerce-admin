import { useNavigate } from "react-router-dom";
import { useCookies } from "../../../../hooks/useCookies";
import { AuthContext } from "../../../../hooks/useAuth";
import { routeNames } from "../../../../config/routes";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserEntity } from "../../../../features/auth/domain/entities/User.entity";
import api from "../../../../config/api";
import axios from "axios";

export type registerData = {
  email: string;
  username: string;
  password: string;
};
export type loginData = {
  email: string;
  password: string;
};

interface UserPayload extends JwtPayload {
  id: number;
  email: string;
  username: string;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useCookies("token", null);
  const [user, setUser] = useCookies("user", null);
  const navigate = useNavigate();

  const handleToken = (token: string): UserEntity => {
    // decode the token
    const decodedToken = jwtDecode<UserPayload>(token);

    const userObject = {
      id: decodedToken.id,
      email: decodedToken.email,
      username: decodedToken.username,
    };

    // initialize the user
    const user = new UserEntity(userObject);

    // set the user
    setUser(user);

    // set the token
    setToken(token);

    // set token for axios
    api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    navigate(routeNames.HomeScreen);

    return user;
  };

  // log in function
  const login = async (data: loginData): Promise<UserEntity> => {
    // log in the user
    try {
      const response = await api.post("/auth/login", data);
  
      return handleToken(response.data.token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new AuthError(error.response?.data.message);
      }

      throw error;
    }
  };

  const register = async (data: registerData): Promise<UserEntity> => {
    // register the user
    try {
      const response = await api.post("/auth/register", data);
  
      return handleToken(response.data.token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new AuthError(error.response?.data.message);
      }

      throw error;
    }
  };

  // log out function
  const logout = () => {
    setToken(null);
    setUser(null);

    // reset token for axios
    api.interceptors.request.use((config) => {
      config.headers.Authorization = ``;
      return config;
    });

    navigate(routeNames.LandingScreen);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
