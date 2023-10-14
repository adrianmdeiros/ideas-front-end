import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Login from "../pages/Login/Login";

type RequireAuthProps = {
  children: JSX.Element;
};

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const auth = useContext(AuthContext);

  if (!auth.isAuthenticated) {
    return <Login />
  }

  return children;
};
