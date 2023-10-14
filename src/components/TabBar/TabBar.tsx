import NavLink from "../NavLink/NavLink";
import { Home as HomeIcon, Search, BookOpen } from "react-feather";
import { Perfil, StyledNavBar} from "./style";
import React, { useContext  } from "react";
import { AuthContext } from "../../contexts/AuthContext";



const TabBar: React.FC = () => {
  const { user } = useContext(AuthContext);
  const userPhoto = `https://suap.ifma.edu.br${user?.url_foto_150x200}`;


  return (
    <>
      {/* {isLargeScreen ? (
        <StyledSideMenu>
          <div>
            <img src={Logo} alt="Logo"/>
            <NavLink to={"/main"} icon={<HomeIcon />} label="Home" display={"flex"}/>
            <NavLink to={"/projects"} icon={<BookOpen />} label="Projetos" display={"flex"}/>
            <NavLink to={"/search"} icon={<Search />} label="Buscar" display={"flex"}/>
          </div>
          <div>
            <NavLink
              to={"/perfil"}
              icon={<Perfil src={userPhoto} alt="Foto de perfil" />}
            />
          </div>
        </StyledSideMenu>
      ) : ( */}
        <StyledNavBar>
          <NavLink to={"/main"} icon={<HomeIcon />} label="Home" />
          <NavLink to={"/projects"} icon={<BookOpen />} label="Projetos" />
          <NavLink to={"/search"} icon={<Search />} label="Buscar" />
          <NavLink
            to={"/perfil"}
            icon={<Perfil src={userPhoto} alt="Foto de perfil" />}
          />
        </StyledNavBar>
      {/* )} */}
    </>
  );
};

export default TabBar;
