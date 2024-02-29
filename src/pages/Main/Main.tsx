import GlobalStyle from "../../styles/global";
import styles from "./Main.module.css";
import Menu from "../../components/Menu/Menu";
import { AlertCircle, Filter } from "react-feather";
import { useFetch } from "../../hooks/useFetch";
import Post from "../../components/Post/Post";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useRef, useState } from 'react'
import Tag from "../../components/Tag/Tag";
import api from "../../api/api";
import { ProjectPages } from "../../types/ProjectPages";
import { dbUser } from "../../types/dbUser";
import { Project } from "../../types/Project";
import FiltersList from "../../components/FiltersList/FiltersList";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";


const Main: React.FC = () => {
  const auth = useContext(AuthContext)
  const { data: user } = useFetch<dbUser>(`${api.defaults.baseURL}/users/${auth.user?.id}`)

  const [projects, setProjects] = useState<Project[] | null>(null)
  const itemsPerPage = 12
  const bottomElement = useRef<HTMLDivElement>(null)

  const { currentPage } = useInfiniteScroll(bottomElement) 

  const { data, setData, isFetching } = useFetch<ProjectPages>(`${api.defaults.baseURL}/projects?usercourseid=${user?.courseId}&skip=${(currentPage - 1) * itemsPerPage}`, [user, currentPage])
  
  useEffect(() => {
    if (data) {
      setProjects(prevProjects => prevProjects ? [...prevProjects, ...data.projectsList!] : data.projectsList) 
    }
  }, [data])


  const [activeFilter, setActiveFilter] = useState<number>()
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const [isFetchingProjects, setIsFetchingProjects] = useState<boolean>(false)

  const fetchProjectsByUserCourseAndCategory = (usercourseid: number, categoryid: number) => {
    setIsSelected(false)
    setProjects(null);
    setIsFetchingProjects(true)

    api.get(`/projects?usercourseid=${usercourseid}&categoryid=${categoryid}`)
      .then(response => {
        setData(response.data);
        setIsFetchingProjects(false);
      })
      .catch(() => {
        setIsSelected(true);
        setIsFetchingProjects(false);
      })
  };

  const fetchAllProjects = () => {
    setIsSelected(false)
    setProjects(null);
    setIsFetchingProjects(true)

    api.get(`/projects?usercourseid=${user?.courseId}`)
      .then(response => {
        setData(response.data);
        setIsFetchingProjects(false);
      })
      .catch(() => {
        setIsSelected(true);
        setIsFetchingProjects(false);
      })
  }

  const fetchProjectsByModality = (modality: string) => {
    setIsSelected(false)
    setProjects(null);
    setIsFetchingProjects(true)

    api.get(`/projects?modality=${modality}`)
      .then(response => {
        setData(response.data)
        setIsFetchingProjects(false)
      })
      .catch(() => {
        setIsSelected(true);
        setIsFetchingProjects(false);
      })
  }

  return (
    <div className={styles.body}>
      <GlobalStyle />
      <Menu />
      <div className={styles.container}>
        <header>
          <h1 style={{ marginBottom: '2rem' }}>Mural</h1>
          <p style={{ display: 'flex', alignItems: 'center', gap: '.6rem', color: '#909090' }} > <Filter size={18} /> Filtrar projetos por categoria</p>
          <FiltersList
            filterAll={fetchAllProjects}
            filterByUserCourseAndCategory={fetchProjectsByUserCourseAndCategory}
          />
          <div className={styles.modalities}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '.6rem', color: '#909090' }} > <Filter size={18} /> Filtrar projetos por modalidade</p>
            <ul className={styles.tagsContainer}>
              <li>
                <Tag
                  active={activeFilter === 0 ? 'active' : ''}
                  onClick={
                    () => {
                      setActiveFilter(0)
                      fetchProjectsByModality('bolsista')
                    }
                  }
                  color="#15b600"
                >
                  Bolsista
                </Tag>
              </li>
              <li>
                <Tag
                  active={activeFilter === 1 ? 'active' : ''}
                  onClick={() => {
                    setActiveFilter(1)
                    fetchProjectsByModality('voluntario')
                  }}
                  color="#009c9c"
                >
                  Voluntário
                </Tag>
              </li>
            </ul>
          </div>
        </header>
        <div className={styles.feed}>
          {isSelected && projects?.length === 0 && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <AlertCircle size={32} />
              <p>Não há projetos dessa categoria.</p>
            </div>
          )}
          {!projects && !isFetching && !isFetchingProjects && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <AlertCircle size={32} />
              <p>Não há ideias de projeto cadastradas.</p>
            </div>
          )}
          {isFetchingProjects && <Loader color={"#ff7a00"} />}

          <ul className={styles.postsContainer}>
            {projects?.map((project: Project, index) =>
              <li key={index}>
                <Post
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
            )}
          </ul>
            <div ref={bottomElement} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.4rem', height: '14rem', marginTop: '4rem' }}>
              {isFetching &&
                <>
                  <Loader color="#fa7700" />
                  <p>Carregando...</p>
                </>
              }
            </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
