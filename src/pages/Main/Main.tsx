import GlobalStyle from "../../styles/global";
import styles from "./Main.module.css";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import { AlertCircle } from "react-feather";
import { useFetch } from "../../hooks/useFetch";
import Post from "../../components/Post/Post";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from 'react'

type Project = {
  id: string;
  title: string;
  description: string;
  studentsRequired: number;
  user: {
    id: number
    name: string;
    avatarURL: string;
    course: {
      id: number
      name: string
    };
  };
  category: {
    name: string;
    color: string
  };
  createdAt: Date
};

type dbUser = {
  id: number
  name: string
  email: string
  phone: string
  // avatarURL: string
  bond: string
  courseId: number
}

const Main: React.FC = () => {
  const auth = useContext(AuthContext)

  const { data: user } = useFetch<dbUser>(`https://api-projif.vercel.app/users/${auth.user?.id}`)

  const { data: projects, isFetching } = useFetch<Project[]>(`https://api-projif.vercel.app/projects?usercourseid=${user?.courseId}`, user)
 

  return (
    <div className={styles.body}>
      <GlobalStyle />
      <Menu />
      <div className={styles.container}>
        <Header position='fixed' padding="0 1rem" backgroundColor="#101010" >
          <h2>Mural</h2>
          {/* <p style={{ textAlign: 'end', display: 'flex', alignItems: 'center' }}>  Bem-vindo(a) <br />{auth.user?.nome_usual}!</p> */}
        </Header>
        <div className={styles.feed}>
            {!projects && !isFetching &&(
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <AlertCircle size={32} />
                <p>Não há ideias de projeto cadastradas.</p>
              </div>
            )}
            {isFetching && <Loader color={"#ff7a00"} />}
            <ul className={styles.postsContainer}>
              {projects?.map((project) =>
                <li key={project.id}>
                  <Post
                    userId={project.user.id}
                    title={project.title}
                    description={project.description}
                    studentsRequired={project.studentsRequired}
                    userName={project.user.name}
                    projectCategory={project.category.name}
                    avatarUrl={project.user.avatarURL}
                    ccolor={project.category.color}
                    userCourse={project.user.course.name}
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
