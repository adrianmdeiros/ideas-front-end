import { Outlet } from "react-router-dom";
import GlobalStyle from "./styles/global";
import AuthProvider from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import VLibras from "@djpfs/react-vlibras";



function App() {
  return (
    <>
    <Toaster position="bottom-right"/>
    <GlobalStyle />
    <VLibras />
    <AuthProvider> 
      <Outlet />
    </AuthProvider>
    </>
  )
}

export default App
