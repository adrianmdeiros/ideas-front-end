import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth";
import Login from "../pages/Login";
import Loader from "../components/Loader";

type RequireAuthProps = {
  children: JSX.Element;
};

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    }, 1000)
  }, [])


  if(loading){
    return (
      <div style={{width:'100%', display:'flex', alignItems:'center',gap:'1rem', padding:'2rem'}}>
        <Loader />
        <p>Entrando...</p>
      </div>
    )
  }
  
  if (!auth.isAuthenticated) {
    return <Login />
  }

    return children

};
