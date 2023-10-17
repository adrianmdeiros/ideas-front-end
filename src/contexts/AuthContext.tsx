import { ReactNode, createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import suapi from "../api/suapi";

type SignInData = {
  matricula: string;
  password: string;
};

export type User = {
  nome_usual: string;
  email: string;
  phone: string;
  url_foto_150x200: string;
  tipo_vinculo: string;
};

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<boolean>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

type AuthProviderProps = {
  children: ReactNode;
};



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
      setUser(await getUserData(tokens.access));
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
    cookies.set("token", tokens.access, {httpOnly: true, secure: true});
    cookies.set("refresh", tokens.refresh);
  };

  const getNewToken = async (refreshToken: string) => {
    const response = await suapi.post("autenticacao/token/refresh/", {
      refresh: refreshToken,
    });
    cookies.set("token", response.data.access, {httpOnly: true, secure: true});
    
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
