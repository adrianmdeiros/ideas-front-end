import { useContext, useEffect, useRef, useState } from 'react'
import { AlertCircle } from "react-feather";
import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/Auth";
import GlobalStyle from "../../styles/global";
import styles from "./Main.module.css";
import Menu from "../../components/Menu";
import Post from "../../components/Post";
import Loader from "../../components/Loader";
import api from "../../api/api";
import { ProjectIdea } from '../../contexts/ServantProjectIdeas';
import ProjectIdeasFilters from '../../components/ProjectIdeasFilters';
import { useSearchParams } from 'react-router-dom';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

type dbUser = {
  name: string
  email: string
  phone: string
  bond: string
  course: {
    id: number
    name: string
  }
}

const Main: React.FC = () => {
  const auth = useContext(AuthContext)
  const [dbUser, setDbUser] = useState<dbUser>()

  useEffect(() => {
    api.get(`${api.defaults.baseURL}/users?id=${auth.user?.id}`)
      .then(response => setDbUser(response.data))
      .catch(e => console.error(e)
      )

  }, [])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  const paginate = (currentPage - 1) * itemsPerPage

  const [searchParams] = useSearchParams()
  const bottomElement = useRef<HTMLDivElement>(null)
  const [mainProjectIdeas, setMainProjectIdeas] = useState<ProjectIdea[] | null>(null)
  const { data: projects, isFetching } = useFetch<ProjectIdea>(`${api.defaults.baseURL}/projects?usercourseid=${dbUser?.course.id}&skip=${paginate}`, searchParams, [dbUser, searchParams])


  useInfiniteScroll(bottomElement, loadMoreContent, isFetching)

  useEffect(() => {
    if (projects) {
      mainProjectIdeas ? setMainProjectIdeas([...mainProjectIdeas, ...projects]) : setMainProjectIdeas(projects)
    }
  }, [projects])


  function loadMoreContent() {
    setCurrentPage(prevPage => prevPage + 1)
  }


  return (
    <div className={styles.body}>
      <GlobalStyle />
      <Menu />
      <div id='container' className={styles.container}>
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
            changeMainProjectIdeas={setMainProjectIdeas}
            setCurrentPage={setCurrentPage}
          />
        </header>
        <div className={styles.feed}>
          {!mainProjectIdeas && !isFetching && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <AlertCircle size={32} />
              <p>Não foram encontradas ideias de projeto.</p>
            </div>
          )}
          {mainProjectIdeas?.length == 0 &&
            <div
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <AlertCircle size={32} />
              <p>Não foram encontradas ideias de projeto.</p>
            </div>}
          <ul className={styles.postsContainer}>
            {mainProjectIdeas?.map((projectIdea: ProjectIdea, index) =>
              <li key={index}>
                <Post
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
            )}
          </ul>
          <div ref={bottomElement} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.4rem', height: '14rem', marginTop: '4rem' }}>
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