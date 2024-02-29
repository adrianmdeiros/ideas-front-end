import { useContext, useState } from "react";
import { AlertCircle, PlusCircle } from "react-feather";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import Menu from "../../components/Menu/Menu";
import Modal from "../../components/Modal/Modal";
import Post from "../../components/Post/Post";
import { MyProjectsContext } from "../../contexts/MyProjectsContext";
import GlobalStyle from "../../styles/global";
import styles from "./MyProjects.module.css";
import { Project } from "../../types/Project";
import ProjectForm from "../../components/ProjectForm/ProjectForm";



const MyProjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectsData = useContext(MyProjectsContext)


  return (
    <>
      <div className={styles.body}>
        <GlobalStyle />
        <Menu />
        <div className={styles.container}>
          <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between  ', backgroundColor: "#101010" }} >
            <h1>Meus Projetos</h1>
            <Button
              backgroundColor="#ff7a00"
              borderRadius=".5rem"
              color="#f5f5f5"
              hover="#ff7b00e8"
              height="4.8rem"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusCircle size={18} />
              Novo
            </Button>
          </header>
          <div className={styles.projectsContainer}>
            <ul className={styles.postsContainer}>
              {projectsData?.projects?.projectsList?.map((project: Project) => (
                <li key={project.title}>
                  <Post
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    studentsRequired={project.studentsRequired}
                    username={project.user.name}
                    category={project.category.name}
                    color={project.category.color}
                    userCourse={project.user.course.name}
                    modality={project.modality}
                    email={project.user.email}
                    phone={project.user.phone}
                  />
                </li>
              ))}
            </ul>
            {!projectsData?.projects && !projectsData.isFetching && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <AlertCircle size={32} />
                <p>Você ainda não adicionou nenhuma ideia de projeto.</p>
              </div>
            )}
            {projectsData?.isFetching && <Loader color={"#ff7a00"} />}
          </div>
          <div>
            <Modal
              isOpen={isModalOpen}
              setOpenModal={() => setIsModalOpen(!isModalOpen)}
            >
              <ProjectForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProjects;
