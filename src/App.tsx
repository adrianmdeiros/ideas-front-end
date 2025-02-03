import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useTheme } from "./contexts/Theme";
import { Moon, Sun } from "react-feather";
import styles from "./styles/styles.module.css";
import './styles/global.css'

function App() {
  const { isDark, toggleTheme } = useTheme()
  return (
    <>
      <div className={styles.themeButton} onClick={toggleTheme}>
        {isDark ? <Sun /> : <Moon />}
      </div>
      <Toaster position="bottom-center" />
      <Outlet />
    </>
  )
}
export default App
