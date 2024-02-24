import { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import suapi from "../api/suapi";
import api from "../api/api";

//types and intefaces
import { SignInData } from "../types/SignInData";
import { User } from "../types/User";
import { AuthProviderProps } from "../types/AuthProvider";
import { AuthContextType } from "../types/AuthContext";

export const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const cookies = new Cookies();
  const isAuthenticated = !!user;

  useEffect(() => {
    validateUser();
  }, []);

  const validateUser = async () => {
    const token = cookies.get("token");
    const refreshToken = cookies.get("refresh");

    if (token || refreshToken) {
      try {
        setUser(await getUserData(token));
      } catch (e) {
        await getNewToken(refreshToken)
      }
    }
  };

  const signIn = async ({ matricula, password }: SignInData) => {
    const response = await suapi.post("autenticacao/token/", {
      username: matricula,
      password: password,
    });

    const tokens = response.data;
    
    if (tokens) {
      const user = await getUserData(tokens.access)
      setUser(user);
      saveUser(user);
      setTokens(tokens);
      return true;
    }
    return false;
  };

  const getUserData = async (token: string) => {
    const response = await suapi.get("minhas-informacoes/meus-dados/", {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const setTokens = (tokens: any) => {
    cookies.set("token", tokens.access, { secure: true });
    cookies.set("refresh", tokens.refresh, { secure: true });
  };

  const saveUser = async (user: User) => {
      try{
        const response = await api.post('/users', {
          id: user.id,
          name: user.nome_usual,
          email: user.email,
          phone: user.phone,
          bond: user.tipo_vinculo,
          course: user.vinculo.curso
        })
        return response.data
      }catch(err){
        console.log(err);
      }
    
  }

  const getNewToken = async (refreshToken: string) => {
    const response = await suapi.post("autenticacao/token/refresh/", {
      refresh: refreshToken,
    });
    cookies.set("token", response.data.access, { secure: true });
    
    const user = await getUserData(response.data.access)
    setUser(user)
    return response.data;
  };

  const signOut = () => {
    setUser(null);
    cookies.remove("token");
    cookies.remove("refresh");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;