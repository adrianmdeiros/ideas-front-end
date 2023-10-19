import React, { useContext } from "react";
import styles from "./Perfil.module.css";
import GlobalStyle from "../../styles/global";
import { LogOut, Mail, MoreVertical, Phone } from "react-feather";
import Header from "../../components/Header/Header";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../../components/Menu/Menu";

const Perfil: React.FC = () => {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const userPhoto = `https://suap.ifma.edu.br${user?.url_foto_150x200}`;

  const handleLogOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <>
      <div className={styles.body}>
        <GlobalStyle />
        <Menu />

        <div className={styles.container}>
          <Header padding="2rem">
            <h2 className={styles.title}>Meu Perfil</h2>
          </Header>
          <hr />
          <div className={styles.userContainer}>
            <div className={styles.card}>
              <div className={styles.top}>
                <img
                  className={styles.userPhoto}
                  src={userPhoto}
                  alt="foto de perfil"
                />
                <div>
                  <h3 className={styles.nome}>{user?.nome_usual} </h3>
                  <p className={styles.vinculo}>{user?.tipo_vinculo} </p>
                </div>
              </div>

              <div className={styles.bottom}>
                <div className={styles.contact}>
                  <div className={styles.email}>
                    <Mail size={24} />
                    <p>Email</p>
                  </div>
                  <p>{user?.email ? user.email : "lima.adrian13@gmail.com"}</p>
                  <MoreVertical size={48} cursor={'pointer'}/>
                </div>
                <div className={styles.contact}>
                  <div className={styles.phone}>
                    <Phone size={24} />
                    <p>Telefone</p>
                  </div>
                  <p>{user?.phone ? user.phone : "98991650677"}</p>
                  <MoreVertical size={32} cursor={'pointer'} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <Link to={'/'} onClick={handleLogOut}>
              Sair
              <LogOut size={18} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Perfil;
