import NavLink from "../NavLink";
import { LogOut, Folder, Grid } from "react-feather";
import { Perfil, StyledTabBar, StyledSideMenu, StyledPerfil, StyledUserInfo, StyledNav } from "./style";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth";
import Logo from "../../assets/LogoHome.svg";
import { Link, useNavigate } from "react-router-dom";
import { userIsServant } from "../../utils/userIsServant";

const Menu: React.FC = () => {
  const auth = useContext(AuthContext);
  
  const userPhoto = auth.user?.url_foto_150x200
  
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(false);
  
  const handleLogOut = () => {
    auth.signOut()
    navigate('/')
  }

  useEffect(() => {
    window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);
    
    window.addEventListener('resize', () => {
      window.innerWidth > 768 ? setIsMobile(false) : setIsMobile(true);
    })


  }, []);


  return (
    <>
      {isMobile ? (
        <StyledTabBar>
          <NavLink to={"/main"} icon={<Grid />} label="Mural" />
          {userIsServant() && <NavLink to={"/projects"} icon={<Folder />} label="Minhas Ideias" />}
          <NavLink
            to={"/perfil"}
            icon={<Perfil src={userPhoto} alt="Foto de perfil" />}
            label="Perfil"
          />
        </StyledTabBar>
      ) : (
        <StyledSideMenu>
          <StyledNav>
            <Link to={'/'} >
              <img src={Logo} alt="Logo" />
            </Link>
            <NavLink
              to={"/main"}
              icon={<Grid />}
              label="Mural"
              display={"flex"}
            />
            {userIsServant() && <NavLink
              to={"/projects"}
              icon={<Folder />}
              label="Minhas Ideias"
              display={"flex"}
            />}
          </StyledNav>
          <StyledPerfil>
            <NavLink
              display="flex"
              to={"/perfil"}
              icon={<Perfil src={userPhoto} alt="Foto de perfil" />}
              >
              <StyledUserInfo>
                <h4>{auth.user?.nome_usual}</h4>
                <p>{auth.user?.tipo_vinculo}</p>
              </StyledUserInfo>
          </NavLink>
              <LogOut size={24} color={'red'} onClick={handleLogOut} cursor={'pointer'} />
          </StyledPerfil>
        </StyledSideMenu>
      )}
    </>
  );
};

export default Menu;
