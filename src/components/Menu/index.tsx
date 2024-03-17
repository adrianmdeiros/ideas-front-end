import NavLink from "../NavLink";
import { LogOut, Folder, Grid } from "react-feather";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth";
import Logo from "../../assets/LogoHome.svg";
import { Link, useNavigate } from "react-router-dom";
import { userIsServant } from "../../utils/userIsServant";
import styles from './styles.module.css'

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
        <nav className={styles.tabBar}>
          <NavLink to={"/main"} icon={<Grid />} label="Mural" />
          {userIsServant() && <NavLink to={"/projects"} icon={<Folder />} label="Minhas Ideias" />}
          <NavLink to={"/perfil"} icon={<img className={styles.img} src={userPhoto} alt="Foto de perfil" />} label="Perfil" />
        </nav>
      ) : (
        <nav className={styles.sideBar}>
          <nav className={styles.nav}>
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
          </nav>
          <div className={styles.perfil}>
            <NavLink
              display="flex"
              to={"/perfil"}
              icon={<img className={styles.img} src={userPhoto} alt="Foto de perfil" />}
              >
              <div className={styles.userInfo}>
                <h4>{auth.user?.nome_usual}</h4>
                <p>{auth.user?.tipo_vinculo}</p>
              </div>
          </NavLink>
              <LogOut size={24} color={'red'} onClick={handleLogOut} cursor={'pointer'} />
          </div>
        </nav>
      )}
    </>
  );
};

export default Menu;
