import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type ThemeContext = {
    isDark: boolean;
    toggleTheme: () => void;
}

type ThemeProvider = {
    children: ReactNode;
}

const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

export const ThemeProvider: React.FC<ThemeProvider> = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('isDark');
        return savedTheme ? JSON.parse(savedTheme) : true;
      });
    
    useEffect(() => {
        document.body.className = isDark ? 'dark' : 'light';
    },[isDark])


    const toggleTheme = () => {
        setIsDark((prev: boolean) => {
            const newTheme = !prev;
            localStorage.setItem('isDark', JSON.stringify(newTheme));
            return newTheme;
          });
    }

    return(
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);