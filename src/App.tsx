import { Outlet } from "react-router-dom";
import GlobalStyle from "./styles/global";
import AuthProvider from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster position="top-center"/>
    <GlobalStyle />
    <AuthProvider> 
      <Outlet />
    </AuthProvider>
    </>
  )
}

export default App
