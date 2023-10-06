import ClickableIcon from "../ClickableIcon/ClickableIcon";
import { Home as HomeIcon, Search, BookOpen } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Perfil, StyledNavBar } from "./style";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const TabBar: React.FC = () => {

  const { user } = useContext(AuthContext)
  
  const navigate = useNavigate();

  const userPhoto = `https://suap.ifma.edu.br${user?.url_foto_150x200}`

  const handleNavigate = (page: string) => {
    navigate(`/${page}`);
  };


  return (
    <StyledNavBar>
      <ClickableIcon
        icon={<HomeIcon />}
        onClick={() => {
          handleNavigate("main");
        }}
      />
      <ClickableIcon
        icon={<BookOpen />}
        onClick={() => handleNavigate("projects")}
      />
      <ClickableIcon
        icon={<Search />}
        onClick={() => handleNavigate("search")}
      />
          <ClickableIcon
            icon={<Perfil src={userPhoto} alt="foto de perfil"></Perfil>}
            onClick={() => handleNavigate("perfil")}
          />
    </StyledNavBar>
  );
};

export default TabBar;
