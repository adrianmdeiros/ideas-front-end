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
      <GlobalStyle />
      <div className={styles.container}>
        <Header height="8rem" position="fixed" padding="0 2rem" backgroundColor="#101010" zIndex="1">
          <h3>Meus Projetos</h3>
          <Button backgroundColor="#ff7a00" borderRadius=".5rem" color="#f5f5f5" hover="#dd8c00" height="3.8rem" onClick={handleNavigate}>
            Novo
            <Plus color="#f5f5f5"/>
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
      <TabBar />
    </>
  );
};

export default Projects;
