import { AlertCircle, Plus } from "react-feather";
import GlobalStyle from "../../styles/global";
import styles from "./MyProjects.module.css";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { useContext, useState } from "react";
import Menu from "../../components/Menu/Menu";
import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/AuthContext";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import api from "../../api/api";
import ProjectForm from "../../components/ProjectForm/ProjectForm";

export type Project = {
  id: string;
  title: string;
  description: string;
  studentsRequired: number;
  user: {
    id: number
    name: string;
    avatarURL: string;
    course: {
      id: number
      name: string
    };
  };
  category: {
    id: number
    name: string;
    color: string
  };
};


const MyProjects = () => {
  const auth = useContext(AuthContext);
  const {
    data: myProjects,
    setData: setMyProjects,
    isFetching,
  } = useFetch<Project[]>(
    `https://api-projif.vercel.app/projects?userId=${auth.user?.id}`
  );

  const [isExcluding, setIsExcluding] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const deleteProject = async (id: string, e: any) => {
    e.preventDefault();
    setIsExcluding(true)
    
    await api.delete(`/projects/${id}`);

    setIsExcluding(false)
    setIsModalOpen(false);

    if (myProjects !== null) {
      const newProjectsList = myProjects.filter((project) => {
        return project.id !== id;
      });


      setMyProjects(newProjectsList);
    }
  };

  
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
            <ul className={styles.postsContainer}>
              {myProjects?.map((project) => (
                <li key={project.id}>
                  <Post
                    userId={auth.user?.id}
                    title={project.title}
                    description={project.description}
                    studentsRequired={project.studentsRequired}
                    userName={project.user.name}
                    projectCategory={project.category.name}
                    avatarUrl={project.user.avatarURL}
                    ccolor={project.category.color}
                    deleteProject={(e) => deleteProject(project.id, e)}
                    isExcluding={isExcluding}
                    userCourse={project.user.course.name}
                  />
                </li>
              ))}
            </ul>
            {!myProjects || myProjects.length === 0 && !isFetching && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <AlertCircle size={32} />
                <p>Você ainda não criou nenhum projeto...</p>
              </div>
            )}
            {isFetching && <Loader color={"#ff7a00"} />}
          </div>
          <div className={styles.modalContainer}>
            <Modal
              isOpen={isModalOpen}
              setOpenModal={() => setIsModalOpen(!isModalOpen)}
            >
              <ProjectForm myProjects={myProjects} setMyProjects={setMyProjects} modalClose={() => setIsModalOpen(!isModalOpen)} />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProjects;
