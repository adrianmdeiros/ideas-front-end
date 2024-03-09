import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Perfil from "../pages/Perfil";
import App from "../App";
import { RequireAuth } from "../contexts/RequireAuth";
import NotFound from "../pages/NotFound";
import ServantProjectIdeasProvider from "../contexts/ServantProjectIdeas";
import ServantProjectIdeas from "../pages/ServantProjectIdeas";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/main',
        element:
          <RequireAuth>
            <Main />
          </RequireAuth>
      },
      {
        path: "/projects",
        element:
          <RequireAuth>
            <ServantProjectIdeasProvider>
              <ServantProjectIdeas />
            </ServantProjectIdeasProvider>
          </RequireAuth>
      },
      {
        path: '/perfil',
        element:
          <RequireAuth>
            <Perfil />
          </RequireAuth>
      }
    ]
  }
])

export default router