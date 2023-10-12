import NavLink from "../NavLink/NavLink";
import { Home as HomeIcon, Search, BookOpen } from "react-feather";
import { Perfil, StyledNavBar, StyledSideMenu } from "./style";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const TabBar: React.FC = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const { user } = useContext(AuthContext);
  const userPhoto = `https://suap.ifma.edu.br${user?.url_foto_150x200}`;


  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsLargeScreen(window.innerWidth > 600);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <>
      {isLargeScreen ? (
        <StyledSideMenu>
          <div>
            <NavLink to={"/main"} icon={<HomeIcon />} label="Home" />
            <NavLink to={"/projects"} icon={<BookOpen />} label="Projetos" />
            <NavLink to={"/search"} icon={<Search />} label="Buscar" />
          </div>
          <div>
            <NavLink
              to={"/perfil"}
              icon={<Perfil src={userPhoto} alt="Foto de perfil" />}
            />
          </div>
        </StyledSideMenu>
      ) : (
        <StyledNavBar>
          <NavLink to={"/main"} icon={<HomeIcon />} label="Home" />
          <NavLink to={"/projects"} icon={<BookOpen />} label="Projetos" />
          <NavLink to={"/search"} icon={<Search />} label="Buscar" />
          <NavLink
            to={"/perfil"}
            icon={<Perfil src={userPhoto} alt="Foto de perfil" />}
          />
        </StyledNavBar>
      )}
    </>
  );
};

export default TabBar;
