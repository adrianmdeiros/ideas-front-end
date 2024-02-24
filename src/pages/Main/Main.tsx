import GlobalStyle from "../../styles/global";
import styles from "./Main.module.css";
import Menu from "../../components/Menu/Menu";
import { AlertCircle, Filter } from "react-feather";
import { useFetch } from "../../hooks/useFetch";
import Post from "../../components/Post/Post";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from 'react'
import Tag from "../../components/Tag/Tag";
import api from "../../api/api";
import { ProjectPages } from "../../types/ProjectPages";
import { dbUser } from "../../types/dbUser";
import { Project } from "../../types/Project";
import FiltersList from "../../components/FiltersList/FiltersList";


const Main: React.FC = () => {
  const auth = useContext(AuthContext)
  const { data: user } = useFetch<dbUser>(`${api.defaults.baseURL}/users/${auth.user?.id}`)

  const { data: projects, setData: setProjects, isFetching } = useFetch<ProjectPages>(`${api.defaults.baseURL}/projects?usercourseid=${user?.courseId}`, user)

  const [activeFilter, setActiveFilter] = useState<Number>()

  const [isSelected, setIsSelected] = useState(false)
  const [isFetchingProjects, setIsFetchingProjects] = useState(false)


  const fetchProjectsByUserCourseIdAndCategory = (usercourseid: number, categoryid: number) => {
    setIsSelected(false)
    setProjects(null);
    setIsFetchingProjects(true)

    api.get(`/projects?usercourseid=${usercourseid}&categoryid=${categoryid}`)
      .then(response => {
        setProjects(response.data);
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
        setProjects(response.data);
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
        setProjects(response.data)
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
            getProjects={fetchAllProjects}
            getProjectsByUserCourseAndCategory={fetchProjectsByUserCourseIdAndCategory}
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
          {isSelected && projects?.projectsList?.length === 0 && (
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
          {isFetching && <Loader color={"#ff7a00"} />}
          {isFetchingProjects && <Loader color={"#ff7a00"} />}

          <ul className={styles.postsContainer}>
            {projects?.projectsList?.map((project: Project) =>
              <li key={project.title}>
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
        </div>
      </div>
    </div>
  );
};

export default Main;
