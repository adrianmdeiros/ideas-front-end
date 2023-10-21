import { AlertCircle, Plus } from "react-feather";
import GlobalStyle from "../../styles/global";
import styles from "./MyProjects.module.css";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { useContext, useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import ProjectForm from "../../components/ProjectForm/ProjectForm";
import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/AuthContext";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";

type Project = {
  id: string;
  title: string;
  description: string;
  studentsRequired: number;
  user: {
    name: string;
    avatarURL: string;
  };
  category: {
    name: string;
    color: string
  };
};

const MyProjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext)
  const { data: myProjects, isFetching } = useFetch<Project[]>(`https://api-projif.vercel.app/projects?userId=${user?.id}`)

  

  return (
    <>
      <div className={styles.body}>
        <GlobalStyle />
        <Menu />
        <div className={styles.container}>
          <Header padding="0 1rem" backgroundColor="#101010">
            <h2>Meus Projetos</h2>
            <Button
              backgroundColor="#ff7a00"
              borderRadius=".5rem"
              color="#f5f5f5"
              hover="#ff7b00e8"
              height="4.2rem"
              onClick={() => setIsModalOpen(true)}
            >
              Novo
              <Plus size={18} />
            </Button>
          </Header>
          <hr />
          <div className={styles.projectsContainer}>

          {!myProjects && (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <AlertCircle size={32} />
              <p>Você ainda não criou nenhum projeto...</p>
            </div>
          )}

          {myProjects?.map((myProject) => 
                <Post
                  id={myProject.id}
                  key={myProject.id}
                  title={myProject.title}
                  description={myProject.description}
                  numberOfStudents={myProject.studentsRequired}
                  userName={myProject.user.name}
                  projectType={myProject.category.name}
                  avatarUrl={myProject.user.avatarURL}
                  ccolor={myProject.category.color}
                />
            )}

            {isFetching && <Loader color={"#ff7a00"} />}
            
          </div>
          <div className={styles.modalContainer}>
            <Modal
              isOpen={isModalOpen}
              setOpenModal={() => setIsModalOpen(!isModalOpen)}
            >
              <ProjectForm />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProjects;
