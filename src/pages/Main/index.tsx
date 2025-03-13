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
import Header from '../../components/Header';
import { normalizeUrlSearchParam } from '../../utils/userIsServant';



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
    if (all) {
        setMuralProjectIdeas(filterMuralProjectIdeas(searchParams)!);
    }
}, [searchParams, all]);


  const filterMuralProjectIdeas = (filters: URLSearchParams) => {
    const category = filters.get('category')?.toUpperCase();
    const modality = filters.get('modality')?.toUpperCase();
    const department = filters.get('department')?.toUpperCase();

    if (filters.size === 0){
      return all; 
    } 

    return all?.filter(project => {
        const matchesCategory = !category || project.category?.name?.toUpperCase() === category;
        const matchesModality = !modality || normalizeUrlSearchParam(project.modality?.name) === modality;
        const matchesDepartment = !department || project.servant?.department?.name?.toUpperCase() === department;

        return matchesCategory && matchesModality && matchesDepartment;
    });

  }


  return (
    <div className={styles.body}>
      <Menu />
      <div className={styles.container}>
        <Header title={'Mural'}>
          <div></div>
          <div className={styles.infos}>
            <p>{auth.user?.vinculo.setor_suap}</p>
            <p>{auth.user?.vinculo.curso}</p>
            <p>{auth.user?.vinculo.campus}  </p>
          </div>
        </Header>
        <ProjectIdeasFilters />
        <div className={styles.feed}>
          {!muralProjectIdeas && !isFetching && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              ✨
              <p>Não foram encontradas ideias de projetos.</p>
            </div>
          )}
          {muralProjectIdeas?.length == 0 &&
            <div
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              ✨
              <p>Não foram encontradas ideias de projetos.</p>
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