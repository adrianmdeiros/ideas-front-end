import { Outlet } from "react-router-dom";
import GlobalStyle from "./styles/global";
import AuthProvider from "./contexts/AuthContext";

function App() {
  return (
    <>
    <AuthProvider>
      <GlobalStyle />
      <Outlet/>
    </AuthProvider>
    </>
  )
}

export default App
