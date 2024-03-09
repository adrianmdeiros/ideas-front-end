import { useContext, useRef, useState } from "react";
import { AlertCircle, PlusCircle } from "react-feather";
import Loader from "../../components/Loader";
import Menu from "../../components/Menu";
import Modal from "../../components/Modal";
import Post from "../../components/Post";
import { ServentProjectIdeasContext, ProjectIdea } from "../../contexts/ServantProjectIdeas";
import GlobalStyle from "../../styles/global";
import styles from "./ServentProjects.module.css";
import ProjectForm from "../../components/ProjectForm";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { userIsServant } from "../../utils/userIsServant";



const ServantProjectIdeas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ServantProjectIdeasContext = useContext(ServentProjectIdeasContext)
  const bottomElement = useRef<HTMLDivElement>(null)
  
  useInfiniteScroll(bottomElement, loadMoreContent, ServantProjectIdeasContext.isFetching)

  function loadMoreContent() {
    ServantProjectIdeasContext.setCurrentPage(prevPage => prevPage + 1)
  }

  return (
    <>
      {userIsServant() &&
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
              {!ServantProjectIdeasContext.servantProjectIdeas && !ServantProjectIdeasContext.isFetching && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <AlertCircle size={32} />
                  <p>Você não possui ideias de projeto criadas.</p>
                </div>
              )}
              {ServantProjectIdeasContext.servantProjectIdeas?.length == 0 &&
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <AlertCircle size={32} />
                  <p>Não foram encontradas ideias de projeto.</p>
                </div>}
              <ul className={styles.postsContainer}>
                {ServantProjectIdeasContext.servantProjectIdeas?.map((projectIdea: ProjectIdea) => (
                  <li key={projectIdea.title}>
                    <Post
                      id={projectIdea.id}
                      title={projectIdea.title}
                      description={projectIdea.description}
                      studentsRequired={projectIdea.studentsRequired}
                      modality={projectIdea.modality}
                      category={projectIdea.category}
                      username={projectIdea.servant.user.name}
                      email={projectIdea.servant.user.email}
                      phone={projectIdea.servant.user.phone}
                      department={projectIdea.servant.department}
                    />
                  </li>
                ))}
              </ul>
              <div ref={bottomElement} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.4rem', height: '14rem', marginTop: '4rem' }}>
                {ServantProjectIdeasContext.isFetching &&
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
      }
    </>
  );
};

export default ServantProjectIdeas;
