import { useContext, useRef, useState } from "react";
import { AlertCircle, PlusCircle } from "react-feather";
import Loader from "../../components/Loader/Loader";
import Menu from "../../components/Menu/Menu";
import Modal from "../../components/Modal/Modal";
import Post from "../../components/Post/Post";
import { MyProjectsContext, Project } from "../../contexts/MyProjectsContext";
import GlobalStyle from "../../styles/global";
import styles from "./MyProjects.module.css";
import ProjectForm from "../../components/ProjectForm/ProjectForm";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";



const MyProjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const myProjectsContext = useContext(MyProjectsContext)
  const bottomElement = useRef<HTMLDivElement>(null)

  useInfiniteScroll(bottomElement, loadMoreContent)

  function loadMoreContent(){
    myProjectsContext.setCurrentPage(prevPage => prevPage + 1)
  }

  return (
    <>
      <div className={styles.body}>
        <GlobalStyle />
        <Menu />
        <div className={styles.container}>
          <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between  ', backgroundColor: "#101010" }} >
            <h1>Meus Projetos</h1>
             <button className={styles.addButton}
              onClick={() => setIsModalOpen(true)}
            >
              <PlusCircle size={18} />
              Adicionar
            </button>
          </header>
          <div className={styles.projectsContainer}>
          {!myProjectsContext.myProjectIdeas || myProjectsContext.myProjectIdeas.length === 0 && !myProjectsContext.isFetching && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <AlertCircle size={32} />
                <p>Você não possui ideias de projeto criadas.</p>
              </div>
            )}
            <ul className={styles.postsContainer}>
              {myProjectsContext.myProjectIdeas?.map((project: Project) => (
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
            <div ref={bottomElement} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.4rem', height: '14rem', marginTop: '4rem' }}>
              {myProjectsContext.isFetching &&
                <>
                  <Loader color="#fa7700" />
                  <p>Carregando...</p>
                </>
              }
            </div>
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
