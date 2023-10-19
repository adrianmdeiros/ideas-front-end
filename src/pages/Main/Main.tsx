import GlobalStyle from "../../styles/global";
import styles from "./Main.module.css";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import { AlertCircle } from "react-feather";
import { useFetch } from "../../hooks/useFetch";
import Post from "../../components/Post/Post";
import Loader from "../../components/Loader/Loader";

type Project = {
  id: string;
  title: string;
  description: string;
  studentsRequired: number;
  user: {
    name: string;
    avatarURL: string;
  };
  category: {
    name: string;
  };
};

const Main: React.FC = () => {
  const { data: projects, isFetching } = useFetch<Project[]>(
    "http://localhost:3000/projects"
  );

  return (
    <div className={styles.body}>
      <GlobalStyle />
      <Menu />
      <div className={styles.container}>
        <Header
          padding="0 1rem"
          backgroundColor="#101010"
        >
          <h2>Descubra</h2>
        </Header>

          <hr />
        <div className={styles.feed}>
            {isFetching && <Loader color={'#ff7a00'}/>}
          <div className={styles.postsContainer}>

            {projects ? (
              projects?.map((project) => {
                return (
                  <Post
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    numberOfStudents={project.studentsRequired}
                    userName={project.user.name}
                    projectType={project.category.name}
                    avatarUrl={project.user.avatarURL}
                    postDate={new Date().getMinutes()}
                  />
                );
              })
            ) : (
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <AlertCircle size={32} />
                <p>Os projetos postados por outras pessoas ficarão aqui...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
