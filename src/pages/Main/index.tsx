import { useContext } from 'react'
import {  HardDrive } from "react-feather";
import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/Auth";
import { ProjectIdea } from '../../contexts/ServantProjectIdeas';
import Menu from "../../components/Menu";
import Post from "../../components/Post";
import Loader from "../../components/Loader";
import api from "../../api/api";
import ProjectIdeasFilters from '../../components/ProjectIdeasFilters';
import styles from "./styles.module.css";


const Main: React.FC = () => {
  const auth = useContext(AuthContext)

  const {
    data: muralProjectIdeas,
    setData: setMuralProjectIdeas,
    isFetching
  } = useFetch<ProjectIdea[] | null>(`${api.defaults.baseURL}/project-ideas`)

  

  return (
    <div className={styles.body}>
      <Menu />
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.title}>
            <h1 style={{ marginBottom: '4rem' }}>Mural</h1>
            <div>
              <p>{auth.user?.vinculo.curso} </p>
              <p> Campus - {auth.user?.vinculo.campus}  </p>
              <p>{auth.user?.vinculo.setor_suap}</p>
            </div>
          </div>
          <ProjectIdeasFilters
            setMuralProjectIdeas={setMuralProjectIdeas}
          />
        </header>
        <div className={styles.feed}>
          {!muralProjectIdeas && !isFetching && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              ✨
              <p>Não foram encotradas ideias de projetos.</p>
            </div>
          )}
          {muralProjectIdeas?.length == 0 &&
            <div
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <HardDrive size={32} />
              <p>Não foram encontradas ideias de projeto.</p>
            </div>}
          <ul className={styles.postsContainer}>
            {muralProjectIdeas?.map((projectIdea: ProjectIdea, index) =>
              <li key={index}>
                <Post
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
            )}
          </ul>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.4rem', height: '14rem', marginTop: '4rem' }}>
            {isFetching && (
              <>
                <Loader color="#fa7700" /> <p>Carregando...</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;