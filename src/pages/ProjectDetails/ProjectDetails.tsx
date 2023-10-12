import React from "react";
import Header from "../../components/Header/Header";
import GlobalStyle from "../../styles/global";
import ClickableIcon from "../../components/NavLink/NavLink";
import { ArrowLeft, Mail, Phone, User } from "react-feather";
import styles from "./ProjectDetaills.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

type Props = {};

const ProjectDetails: React.FC<Props> = () => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(-1)
  };

  const handleZap = () => {
    alert("mandar pro zap");
  };

  const perfilImage =
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80";
  return (
    <>
      <GlobalStyle />
      <div className={styles.container}>
        <Header
          height="6rem"
          position="fixed"
          backgroundColor="#101010"
          padding="0 2rem"
        >
          <ClickableIcon icon={<ArrowLeft />} onClick={handleNavigate} />
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
    </>
  );
};

export default ProjectDetails;
