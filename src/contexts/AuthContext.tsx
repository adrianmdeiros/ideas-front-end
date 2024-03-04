import { ReactNode, createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import suapi from "../api/suapi";
import api from "../api/api";

type SignInData = {
  matricula: string;
  password: string;
}

type User = {
  id: number
  nome_usual: string
  email: string
  phone: string
  url_foto_150x200: string
  tipo_vinculo: string
  vinculo: {
    curso: string
    campus: string
  }
};

type AuthContextProps = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<boolean>;
  signOut: () => void;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>(null!);

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

  const getUserData = async (token: string) => {
    const response = await suapi.get("minhas-informacoes/meus-dados/", {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const getNewToken = async (refreshToken: string) => {
    const response = await suapi.post("autenticacao/token/refresh/", {
      refresh: refreshToken,
    });
    cookies.set("token", response.data.access, { secure: true });
    
    const user = await getUserData(response.data.access)
    setUser(user)
    return response.data;
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

  const setTokens = (tokens: any) => {
    cookies.set("token", tokens.access, { secure: true });
    cookies.set("refresh", tokens.refresh, { secure: true });
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