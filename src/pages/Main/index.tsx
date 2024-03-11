import { useContext, useEffect, useState } from 'react'
import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/Auth";
import { ProjectIdea } from '../../contexts/ServantProjectIdeas';
import Menu from "../../components/Menu";
import Post from "../../components/Post";
import Loader from "../../components/Loader";
import api from "../../api/api";
import ProjectIdeasFilters from '../../components/ProjectIdeasFilters';
import styles from "./styles.module.css";
import { useSearchParams } from 'react-router-dom';



const Main: React.FC = () => {
  const auth = useContext(AuthContext)
  const [searchParams, _] = useSearchParams()
  const [all, setAll] = useState<ProjectIdea[] | null>(null)

  const {
    data: muralProjectIdeas,
    setData: setMuralProjectIdeas,
    isFetching
  } = useFetch<ProjectIdea[] | null>(`${api.defaults.baseURL}/project-ideas`)

  useEffect(() => {
    setAll(muralProjectIdeas)
  }, [isFetching])

  useEffect(() => {
    setMuralProjectIdeas(filterMuralProjectIdeas(searchParams)!)
  }, [searchParams])


  const filterMuralProjectIdeas = (filters: URLSearchParams) => {
    const category = filters.get('category')
    const modality = filters.get('modality')


    if (filters.size === 0) {
      return all
    }

    if (modality && category) {
      return all?.filter(project =>
        (project.modality.name === modality.toUpperCase()) && (project.category.name === category.toUpperCase())
      )
    }

    if (category) {
      return all?.filter(project => project.category.name === category.toUpperCase())
    }

    if (modality) {
      return all?.filter(project => project.modality.name === modality.toUpperCase())
    }


  }

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
              ✨
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