import React from "react";
import GlobalStyle from "../../styles/global";
import { Mail, Phone, User } from "react-feather";
import styles from "./ProjectDetaills.module.css";
import Button from "../../components/Button/Button";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";



export type PostProps = {
  avatarUrl?: string;
  userName?: string;
  title?: string;
  description?: string;
  studentsRequired?: number;
  projectCategory?: string;
  ccolor?: string;
  deleteProject?: (e: any) => void
  isExcluding?: boolean
  userCourse?: string
  userId?: number
};

type Contacts = {
  email: string;
  phone: string;
}

const ProjectDetails: React.FC<PostProps> = ({
  userId,
  ccolor,
  userName,
  title,
  description,
  studentsRequired,
  projectCategory,
  avatarUrl,
  userCourse
}) => {

  const { data: contacts, isFetching } = useFetch<Contacts>(`https://api-projif.vercel.app/users/${userId}/contacts`)
  

  const perfilImage = `https://suap.ifma.edu.br${avatarUrl}`;


  return (
    <>
      <div className={styles.body}>
        <GlobalStyle />

        <h3 className={styles.title}>Detalhes do projeto</h3>
        <div className={styles.container}>
          <div className={styles.projectContainer}>
            <div className={styles.top}>
              <img
                className={styles.userPhoto}
                src={perfilImage}
                alt="foto de perfil"
              />
              <div>
                <h3>{userName}</h3>
                <p>{title}</p>
                <p>{userCourse}</p>
              </div>
            </div>
            <div className={styles.middle}>
              <h4>Descrição</h4>
              <p style={{color: ccolor}}>
                {description}
              </p>
              <div className={styles.projectReqContainer}>
                <div className={styles.projectReq}>
                  <User size={18} />
                  <p> {studentsRequired} aluno(s)</p>
                </div>
                <div className={styles.projectReq}>
                  <div className={styles.projectTypeColor} style={{ backgroundColor: ccolor }} />
                  <p>{projectCategory}</p>
                </div>
              </div>
            </div>
            {isFetching && <Loader />}
            <div className={styles.bottom}>
              <h4>Contatos</h4>
              <div className={styles.contact}>
                <Mail size={18} />
                <p>{contacts?.email}</p>
              </div>
              <div className={styles.contact}>
                <Phone size={18} />
                <p>{contacts?.phone}</p>
              </div>
            </div>
            <Button
              backgroundColor="#f5f5f5"
              borderRadius=".5rem"
              color="#101010"
              hover="#d3d3d3"
              width="100%"
            >
              Enviar mensagem
            </Button>
          </div>
        </div>
      </div>

    </>
  );
};

export default ProjectDetails;
