import { useEffect, useState } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState('dark')
    
    useEffect(()=>{
        const theme = localStorage.getItem('theme')
        if(theme)
            setTheme(theme)
        else
            return
    },[])

    return { theme, setTheme }
}