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
import Button from "../../components/Button/Button";
import { ProjectPages } from "../../types/ProjectPages";
import { Category } from "../../types/Category";
import { dbUser } from "../../types/dbUser";
import { Project } from "../../types/Project";


const Main: React.FC = () => {
  const auth = useContext(AuthContext)
  const { data: categories, isFetching: isFetchingCategories } = useFetch<Category[]>(
    `${api.defaults.baseURL}/categories`
  );
  const { data: user } = useFetch<dbUser>(`${api.defaults.baseURL}/users/${auth.user?.id}`)

  const { data: projects, setData: setProjects, isFetching } = useFetch<ProjectPages>(`${api.defaults.baseURL}/projects?usercourseid=${user?.courseId}`, user)


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
          <div className={styles.categories}>
            {isFetchingCategories && <Loader color={"#ff7a00"} />}
            <ul className={styles.tagsContainer}>
              <li>
                <Tag onClick={fetchAllProjects} color="crimson">
                  TODOS
                </Tag>
              </li>
              {categories?.map((category) => (
                <li key={category.id}>
                  <Tag
                    onClick={() => {
                      if (user) {
                        fetchProjectsByUserCourseIdAndCategory(user?.courseId, category.id)
                      }
                    }}
                    color={category.color}
                  >
                    <p>{category.name}</p>
                  </Tag>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.modalities}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '.6rem', color: '#909090' }} > <Filter size={18} /> Filtrar projetos por modalidade</p>
            <ul className={styles.tagsContainer}>
              <li>
                <Tag onClick={() => fetchProjectsByModality('bolsista')} color="#15b600">
                  Bolsista
                </Tag>
              </li>
              <li>
                <Tag onClick={() => fetchProjectsByModality('voluntario')} color="#009c9c">
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
          {!projects && !isFetching && (
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
                  userId={project.user.id}
                  title={project.title}
                  description={project.description}
                  studentsRequired={project.studentsRequired}
                  username={project.user.name}
                  category={project.category.name}
                  color={project.category.color}
                  userCourse={project.user.course.name}
                  modality={project.modality}
                />
              </li>
            )}
          </ul>
          {projects && projects.totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
              <Button width="18.0rem" backgroundColor="#f5f5f5" borderRadius=".5rem" color="#101010" hover="#f5f5f5dd">Carregar mais</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
