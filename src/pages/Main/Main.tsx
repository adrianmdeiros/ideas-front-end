import GlobalStyle from "../../styles/global";
import styles from "./Main.module.css";
import Header from "../../components/Header/Header";
import TabBar from "../../components/TabBar/TabBar";
import { AlertCircle, User as UserIcon } from "react-feather";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from 'react'
import { useFetch } from "../../hooks/useFetch";
import Post from "../../components/Post/Post";

type Project = {
  id: string;
  title: string;
  description: string;
  studentsRequired: number
  user: {
    name: string;
    avatarURL: string;
  }
  category: {
    name: string
  }
}


const Main: React.FC= () => {
  const { user } = useContext(AuthContext)
  const { data: projects, isFetching, error } = useFetch<Project[]>('https://jubilant-eureka-4vvpxv4964727x7w-3000.app.github.dev/projects')


  return (
    <div className={styles.body}>
      <GlobalStyle />
      <TabBar />
      <div className={styles.container}>
        <Header position="fixed" padding="2rem"  height="9rem" backgroundColor="#101010">
          <h2>Descubra</h2>
          <div style={{display:'flex', gap:'1rem'}}>
            <UserIcon size={38}/>
            <p>Bem-vindo(a), <br /> {user?.nome_usual}</p>
          </div>
        </Header>
          <main>
          <div className={styles.feed}>
            <div className={styles.postsContainer}>
              
              {isFetching && <p>Carregando...</p> }

              {projects ? 
              projects?.map(project => {
                return(
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
                )})
              : (
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <AlertCircle size={32} />
                <p>Os projetos postados por outras pessoas ficarão aqui...</p>
              </div>
              )}
            </div>
          </div>          
          </main>
      </div>
    </div>
  );
};

export default Main;
