// import React, { useEffect, useState } from "react";
import GlobalStyle from "../../styles/global";
import { DollarSign, Mail, Phone, User } from "react-feather";
import styles from "./ProjectDetaills.module.css";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
// import api from "../../api/api";



export type PostProps = {
  id?: string
  avatarUrl?: string;
  userName?: string;
  title?: string;
  description?: string;
  studentsRequired?: number;
  modality?: string;
  amountUsersInterested?: number;
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
  // id,
  userId,
  ccolor,
  userName,
  title,
  description,
  studentsRequired,
  modality,
  // amountUsersInterested,
  projectCategory,
  // avatarUrl,
  userCourse
}) => {

  const { data: contacts, isFetching } = useFetch<Contacts>(
    `https://api-projif.vercel.app/users/${userId}/contacts`
    )

  // const [interestedUsers, setInterestedUsers] = useState(0)
  // const [isButtonVisible, setIsButtonVisible] = useState(true)

  // useEffect(() => {
  //   setInterestedUsers(amountUsersInterested ? amountUsersInterested : 0)
  // }, [])

  // const perfilImage = avatarUrl;

  // const demonstrateInterest = async () => {
  //   const response = await api.put(`/projects/${id}/increment`)
  //   const { amountUsersInterested } = response.data
  //   setInterestedUsers(amountUsersInterested)
  //   setIsButtonVisible(false)
  // }

  return (
    <>
      <div className={styles.body}>
        <GlobalStyle />
        <h2 className={styles.title}>Detalhes do projeto</h2>
        <div className={styles.container}>
          <div className={styles.projectContainer}>
            <div className={styles.top}>
              <h4>Autor</h4>
              <div className={styles.autor}>
                {/* <img
                  className={styles.userPhoto}
                  src={perfilImage}
                  alt="foto de perfil"
                /> */}
                <div>
                  <h3>{userName}</h3>
                  <p>{userCourse}</p>
                </div>
              </div>
            </div>
            <div className={styles.middle}>
              <h3>Título</h3>
              <p>{title}</p>
              <h4>Descrição</h4>
              <p style={{ color: ccolor }}>
                {description}
              </p>
              <div className={styles.projectReq}>
                <div className={styles.projectTypeColor} style={{ backgroundColor: ccolor }} />
                <p>{projectCategory}</p>
              </div>
              <div className={styles.projectReqContainer}>
                {/* <div className={styles.projectReq}>
                  <Star size={18} />
                  <p>{interestedUsers}</p>
                </div> */}
                <div style={{ display: 'flex', alignItems: 'end', gap: '1rem' }}>
                  <div className={styles.projectReq}>
                    <DollarSign size={18} />
                    <p>{modality ? modality : '-'}</p>
                  </div>
                  <div className={styles.projectReq}>
                    <User size={18} />
                    <p> {studentsRequired} aluno(s)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bottom}>
              <h4>Contatos</h4>
              <div className={styles.contacts}>
                <div className={styles.contact}>
                  <Mail size={18} />
                  <p>{contacts?.email ? contacts.email : "Sem email cadastrado"}</p>
                </div>
                <div className={styles.contact}>
                  <Phone size={18} />
                  <p>{contacts?.phone ? contacts.phone : "Sem telefone cadastrado"}</p>
                </div>
              </div>
            </div>
            {isFetching && <Loader />}
            {/* {isButtonVisible && (
              <button className={styles.button} onClick={demonstrateInterest}  >
                <Star size={18} />
                Demonstrar interesse
              </button>
            )} */}
          </div>
        </div>
      </div>

    </>
  );
};

export default ProjectDetails;
