import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import suapi from "../api/suapi";


type SignInData = {
  matricula: string;
  password: string;
};

type User = {
  nome_usual: string;
  email: string;
  phone: string;
  url_foto_150x200: string;
  tipo_vinculo: string;
};

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

type AuthProviderProps = {
  children: ReactNode;
};


const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [ user, setUser ] = useState<User>({} as User);
  const navigate = useNavigate()
  const cookies = new Cookies()
  const isAuthenticated = !!user;
  
  
  useEffect(() => {
    const tokens = cookies.get('tokens')

    if(tokens){
      verifyToken(tokens.access)
      .then(() => {
        getUserData()
        .then(data => setUser(data))
        .catch(() => getNewTokens(tokens.refresh)
        .then(() => getUserData()
          .then((data) => setUser(data))))
          .catch(() => navigate('/login'))
      })
    }

    
    }, [])


  const signIn = async ({ matricula, password }: SignInData) => {
    const { data } = await suapi.post("autenticacao/token/", {
      username: matricula,
      password: password,
    });

    const tokens = data

    cookies.set('tokens', tokens);

    suapi.defaults.headers['Authorization'] = `Bearer ${tokens.access}`
    
    const userData = await getUserData()

    setUser(userData);
    navigate('/main')
  };

  const getUserData = async () => {
    const { data } = await suapi.get('minhas-informacoes/meus-dados/')
    return data 
  }

  const verifyToken = async (tokenToVerify: string) => {
    const { data } = await suapi.post('autenticacao/token/verify/', {
      token: tokenToVerify
    })  

    return data
  }

  const getNewTokens = async (refreshToken: string) => {
    const { data } = await suapi.post('autenticacao/token/refresh/', {
      refresh: refreshToken
    })

    const newTokens = data
    
    cookies.set('tokens', newTokens)
  }


  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
