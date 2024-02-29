import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Main from "../pages/Main/Main";
import MyProjects from "../pages/MyProjects/MyProjects";
import Perfil from "../pages/Perfil/Perfil";
import App from "../App";
import { RequireAuth } from "../contexts/RequireAuth";
import NotFound from "../pages/NotFound/NotFound";
import MyProjectsProvider from "../contexts/MyProjectsContext";

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
            <MyProjectsProvider>
              <MyProjects />
            </MyProjectsProvider>
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