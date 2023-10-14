import { AlertCircle, Plus } from "react-feather";
import GlobalStyle from "../../styles/global";
// import Post from "../../components/Post/Post";
import { useNavigate } from "react-router-dom";
import styles from "./Projects.module.css";
import Header from "../../components/Header/Header";
import TabBar from "../../components/TabBar/TabBar";
import Button from "../../components/Button/Button";


const Projects = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/create');
  };

  return (
    <>
    <div className={styles.body}>
      <GlobalStyle />
      <TabBar />
      <div className={styles.container}>
        <Header  height="9rem" position="fixed" padding="2rem" backgroundColor="#101010" zIndex="1">
          <h2>Meus Projetos</h2>
          <Button backgroundColor="#ff7a00" borderRadius=".5rem" color="#f5f5f5" hover="#dedede" height="4.2rem" onClick={handleNavigate}>
            Novo
            <Plus size={18}/>
          </Button>
        </Header>
        <main>
          <div className={styles.projectsContainer}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <AlertCircle size={32}/>
              <p>Os projetos que você adicionar ficarão aqui...</p>
            </div>
            {/* <Post /> */}
          </div>
        </main>
      </div>
    </div>
    </>
  );
};

export default Projects;
