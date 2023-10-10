import ClickableIcon from "../ClickableIcon/ClickableIcon";
import { Home as HomeIcon, Search, BookOpen } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Perfil, StyledNavBar, StyledSideMenu } from "./style";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const TabBar: React.FC = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const { user } = useContext(AuthContext);
  const userPhoto = `https://suap.ifma.edu.br${user?.url_foto_150x200}`;
  const navigate = useNavigate();

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsLargeScreen(window.innerWidth > 600);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const handleNavigate = (page: string) => {
    navigate(`/${page}`);
  };

  return (
    <>
      {isLargeScreen ? (
        <StyledSideMenu>
          <div>
            <ClickableIcon
              icon={<HomeIcon />}
              onClick={() => handleNavigate("main")}
              label="Home"
              display="flex"
            />
            <ClickableIcon
              icon={<BookOpen />}
              onClick={() => handleNavigate("projects")}
              label="Projetos"
              display="flex"
            />
            <ClickableIcon
              icon={<Search />}
              onClick={() => handleNavigate("search")}
              label="Buscar"
              display="flex"
            />
          </div>
          <ClickableIcon
            icon={<Perfil src={userPhoto} alt="foto de perfil"></Perfil>}
            onClick={() => handleNavigate("perfil")}
          />
        </StyledSideMenu>
      ) : (
        <StyledNavBar>
          <ClickableIcon
            icon={<HomeIcon />}
            onClick={() => handleNavigate("main")}
            label="Home"
          />
          <ClickableIcon
            icon={<BookOpen />}
            onClick={() => handleNavigate("projects")}
            label="Projetos"
          />
          <ClickableIcon
            icon={<Search />}
            onClick={() => handleNavigate("search")}
            label="Buscar"
          />
          <ClickableIcon
            icon={<Perfil src={userPhoto} alt="foto de perfil"></Perfil>}
            onClick={() => handleNavigate("perfil")}
          />
        </StyledNavBar>
      )}
    </>
  );
};

export default TabBar;
