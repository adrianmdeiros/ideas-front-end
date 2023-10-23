import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import GlobalStyle from "../../styles/global";
import { ArrowLeft, Mail, Phone, User } from "react-feather";
import styles from "./ProjectDetaills.module.css";
import Button from "../../components/Button/Button";
import NavLink from "../../components/NavLink/NavLink";
import { AuthContext } from "../../contexts/AuthContext";

type Props = {};

const ProjectDetails: React.FC<Props> = () => {
  const auth = useContext(AuthContext)

  const handleZap = () => {
    alert("mandar pro zap");
  };

  const perfilImage =
  `https://suap.ifma.edu.br${auth.user?.url_foto_150x200}`;
  return (
    <>
    <div className={styles.body}>

      <GlobalStyle />
      <div className={styles.container}>
        <Header
          height="6rem"
          position="fixed"
          backgroundColor="#101010"
          padding="0 2rem"
        >
          <NavLink icon={<ArrowLeft />} onClick={() => history.back()} to={"#"} />
          <h3 className={styles.title}>Detalhes do projeto</h3>
        </Header>
        <main>
          <div className={styles.projectContainer}>
            <div className={styles.top}>
              <img
                className={styles.userPhoto}
                src={perfilImage}
                alt="foto de perfil"
              />
              <div>
                <h3>Nome do Professor</h3>
                <p>Projeto de desenvolvimento de plataforma</p>
              </div>
            </div>
            <div className={styles.middle}>
              <h4>Descrição</h4>
              <p className={styles.projectDescription}>
                O projeto irá consistir em desenvovler uma plataforma para
                auxiliar tarefas diarias
              </p>
              <div className={styles.projectReqContainer}>
                <div className={styles.projectReq}>
                  <User size={18} />
                  <p>2 alunos</p>
                </div>
                <div className={styles.projectReq}>
                  <div className={styles.projectTypeColor} />
                  <p>PIBIC</p>
                </div>
              </div>
            </div>
            <div className={styles.bottom}>
              <h4>Contatos</h4>
              <div className={styles.contact}>
                <Mail size={18} />
                <p>email@exemplo.com</p>
              </div>
              <div className={styles.contact}>
                <Phone size={18} />
                <p>(55) 55555-5555</p>
              </div>
            </div>
        <Button
          backgroundColor="#f5f5f5"
          borderRadius=".5rem"
          color="#101010"
          hover="#d3d3d3"
          width="100%"
          onClick={handleZap}
        >
          Enviar mensagem
        </Button>
          </div>
        </main>
      </div>
    </div>

    </>
  );
};

export default ProjectDetails;
