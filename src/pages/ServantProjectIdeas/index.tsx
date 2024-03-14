import {  useContext, useState } from "react";
import { Plus } from "react-feather";
import Loader from "../../components/Loader";
import Menu from "../../components/Menu";
import Modal from "../../components/Modal";
import Post from "../../components/Post";
import { ProjectIdea, ServantProjectIdeasContext } from "../../contexts/ServantProjectIdeas";
import styles from "./styles.module.css";
import ProjectForm from "../../components/ProjectForm";
import { userIsServant } from "../../utils/userIsServant";
import Main from "../Main";



const ServantProjectIdeas = () => {
  const servantProjectIdeasContext = useContext(ServantProjectIdeasContext)

  const [isModalOpen, setIsModalOpen] = useState(false);


  if(!userIsServant()){
    return <Main/>
  }

  return (
    <>
      {userIsServant() &&
          <div className={styles.body}>
            <Menu />
            <div className={styles.container}>
              <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between  ', backgroundColor: "#101010" }} >
                <h1>Minhas Ideias</h1>
                <button className={styles.addButton}
                  onClick={() => setIsModalOpen(true)}
                >
                  <Plus size={18} />
                  <p> Adicionar </p>
                </button>
              </header>
              <div className={styles.projectsContainer}>
                {!servantProjectIdeasContext.servantProjectIdeas  && !servantProjectIdeasContext.isFetching && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                  >
                    ✨
                    <p>Você ainda não adicionou ideias de projeto.</p>
                  </div>
                )}
                {servantProjectIdeasContext.servantProjectIdeas?.length == 0 && (
                   <div
                   style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                 >
                   ✨
                   <p>Você não tem ideias de projeto adicionadas.</p>
                 </div>
                )}
                <ul className={styles.postsContainer}>
                  {servantProjectIdeasContext.servantProjectIdeas?.map((projectIdea: ProjectIdea) => (
                    <li key={projectIdea.title}>
                      <Post
                        id={projectIdea.id}
                        title={projectIdea.title}
                        description={projectIdea.description}
                        studentsRequired={projectIdea.studentsRequired}
                        modality={projectIdea.modality.name}
                        category={projectIdea.category.name}
                        username={projectIdea.servant.user.name}
                        email={projectIdea.servant.user.email}
                        phone={projectIdea.servant.user.phone}
                        department={projectIdea.servant.department.name}
                      />
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.4rem', height: '14rem', marginTop: '4rem' }}>
                  {servantProjectIdeasContext.isFetching &&
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
