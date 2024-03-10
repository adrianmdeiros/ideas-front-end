import { Outlet } from "react-router-dom";
import AuthProvider from "./contexts/Auth";
import { Toaster } from "react-hot-toast";
import './styles/global.module.css'

function App() {
  return (
    <>
    <Toaster position="bottom-center"/>
    <AuthProvider> 
      <Outlet />
    </AuthProvider>
    </>
  )
}

export default App
