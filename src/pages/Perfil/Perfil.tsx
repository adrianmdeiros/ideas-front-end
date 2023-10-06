import React, { useContext } from "react";
import styles from "./Perfil.module.css";
import GlobalStyle from "../../styles/global";
import { ArrowLeft, LogOut, Mail, Phone } from "react-feather";
import ClickableIcon from "../../components/ClickableIcon/ClickableIcon";
import TabBar from "../../components/TabBar/TabBar";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Cookies from "universal-cookie";
import Button from "../../components/Button/Button";



const Perfil: React.FC = () => {
  const { user } = useContext(AuthContext)

  
  const userPhoto = `https://suap.ifma.edu.br${user?.url_foto_150x200}`


  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(-1);
  };

  const handleLogOut = () => {
    const cookies = new Cookies()
    cookies.remove('tokens')
  }

  return (
    <>
      <GlobalStyle />
      <div className={styles.container}>
        <Header
          padding="0 2rem"
          height="6rem"
          position="fixed"
          backgroundColor="#101010"
        >
            <ClickableIcon icon={<ArrowLeft />} onClick={handleNavigate}/>

          <h3 className={styles.title}>Perfil</h3>
        </Header>
        <main>
          <div className={styles.userContainer}>
            <div className={styles.top}>
              <img
                className={styles.userPhoto}
                src={userPhoto}
                alt="foto de perfil"
              />
              <div>
                <h3>{user?.nome_usual}</h3>
                <p>{user?.tipo_vinculo}</p>
                {/* <p>{user.vinculo.curso} - {user.vinculo.campus}</p> */}
              </div>
            </div>
            <div className={styles.middle}>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis maxime, explicabo harum voluptatibus accusantium molestiae necessitatibus minima beatae officiis quo itaque vero ut id eum esse saepe repellendus eos commodi.</p>
            </div>
            <div className={styles.bottom}>
              <div className={styles.contact}>
                <Mail size={18} />
                <p>{user?.email? user.email : 'Email não encontrado no SUAP'}</p> 
              </div>
              <div className={styles.contact}>
                {/* <Phone size={18} /> */}
                {/* <Button height="3.2rem" backgroundColor="#f5f5f5" borderRadius=".8rem" color="#101010" hover="#dedede">Adicionar um telefone</Button> */}
                {/* <p>(55) 55555-5555</p> */}
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <a href="">Termos de serviço</a>
            <a href="">Políticas de privacidade</a>
            <a href="http://localhost:5173/" onClick={handleLogOut}>
              Sair
              <LogOut size={18} />
            </a>
          </div>
        </main>
      </div>
      <TabBar />
    </>
  );
};

export default Perfil;
