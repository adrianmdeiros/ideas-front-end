import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Main from "../pages/Main/Main";
import Projects from "../pages/Projects/Projects";
import Search from "../pages/Search/Search";
import Perfil from "../pages/Perfil/Perfil";
import ProjectDetails from "../pages/ProjectDetails/ProjectDetails";
import NewProject from "../pages/NewProject/NewProject";
import App from "../App";
import { RequireAuth } from "../contexts/RequireAuth";

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
          <Projects/>
        </RequireAuth>
      },
      {
        path: '/perfil',
        element: 
        <RequireAuth>
          <Perfil/>
        </RequireAuth>
      },
      {
        path: '/search',
        element: 
        <RequireAuth>
          <Search />
        </RequireAuth>
      },
      {
        path: '/details',
        element: 
        <RequireAuth>
          <ProjectDetails />
        </RequireAuth>
      },
      {
        path: '/create',
        element: 
        <RequireAuth>
          <NewProject />
        </RequireAuth>
      }
    ]
  },
  

])

export default Router