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
        element: <Login/>
      },
      {
        path: '/main',
        element: <Main/>
      },
      {
        path: "/projects",
        element: <Projects/>
      },
      {
        path: '/perfil',
        element: <Perfil/>
      },
      {
        path: '/search',
        element: <Search/>
      },
      {
        path: '/details',
        element: <ProjectDetails />
      },
      {
        path: '/create',
        element: <NewProject/>
      }
    ]
  },
  

])

export default Router