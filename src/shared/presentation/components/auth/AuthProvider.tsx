import { useNavigate } from "react-router-dom";
import { useCookies } from "../../../../hooks/useCookies";
import { AuthContext } from "../../../../hooks/useAuth";
import { routeNames } from "../../../../config/routes";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useCookies("token", null);
    const navigate = useNavigate();
  
    // log in function
    const login = async (token: string) => {
      // TODO: validate the user

      setToken(token);
      navigate(routeNames.HomeScreen);
    };
  
    // log out function
    const logout = () => {
      setToken(null);
      navigate(routeNames.LandingScreen);
    };
  
    return (
      <AuthContext.Provider value={{ token, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };