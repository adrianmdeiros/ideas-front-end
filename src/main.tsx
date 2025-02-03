import ReactDOM from 'react-dom/client'
import { ThemeProvider } from './contexts/Theme'
import { AuthProvider } from './contexts/Auth'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </ThemeProvider>
)
