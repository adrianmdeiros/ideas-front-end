import React, { useContext } from "react";
import styles from "./Perfil.module.css";
import GlobalStyle from "../../styles/global";
import { Edit, LogOut, Mail, Phone } from "react-feather";
import TabBar from "../../components/TabBar/TabBar";
import Header from "../../components/Header/Header";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
        <TabBar />
        <Header padding="2rem" backgroundColor="#101010">
          <h2 className={styles.title}>Meu Perfil</h2>
        </Header>
        <main>
          <div className={styles.container}>
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
                  <h4>Contatos</h4>
                  <div className={styles.contact}>
                    <Mail size={24} />
                    <div className={styles.email}>
                      <p>{user?.email ? user.email : "Email não encontrado"}</p>
                      <Edit size={18} color="orange" />
                    </div>
                  </div>
                  <div className={styles.contact}>
                    <Phone size={24} />
                    <div className={styles.phone}>
                      <p>
                        {user?.phone ? user.phone : "Telefone não encontrado"}
                      </p>
                      <Edit size={18} color="orange" />
                    </div>
                  </div>
                                </div>
                              </div>
                </div>
            <div className={styles.footer}>
              <a href="http://localhost:5173/" onClick={handleLogOut}>
                Sair
                <LogOut size={18} />
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Perfil;
