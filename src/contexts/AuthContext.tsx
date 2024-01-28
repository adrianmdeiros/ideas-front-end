import { ReactNode, createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import suapi from "../api/suapi";
import api from "../api/api";

type SignInData = {
  matricula: string;
  password: string;
};

export type User = {
  id: number
  nome_usual: string;
  email: string;
  phone: string;
  url_foto_150x200: string
  tipo_vinculo: string;
  vinculo: {
    curso: string;
    campus: string;
  }
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
    cookies.set("token", tokens.access);
    cookies.set("refresh", tokens.refresh);
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
    cookies.set("token", response.data.access);
    
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
