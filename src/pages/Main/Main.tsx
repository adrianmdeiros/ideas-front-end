import GlobalStyle from "../../styles/global";
import styles from "./Main.module.css";
import Header from "../../components/Header/Header";
import TabBar from "../../components/TabBar/TabBar";
import { AlertCircle, User } from "react-feather";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from 'react'




const Main: React.FC= () => {
  const { user } = useContext(AuthContext)
  
  return (
    <div className={styles.body}>
      <GlobalStyle />
      <TabBar />
      <div className={styles.container}>
        <Header position="fixed" padding="2rem"  height="9rem" backgroundColor="#101010">
          <h2>Descubra</h2>
          <div style={{display:'flex', gap:'1rem'}}>
            <User size={38}/>
            <p>Bem-vindo(a), <br /> {user?.nome_usual}</p>
          </div>
        </Header>
          <main>
          <div className={styles.feed}>
            <div className={styles.postsContainer}>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <AlertCircle size={32} />
                <p>Os projetos postados por outras pessoas ficarão aqui...</p>
              </div>
            </div>
          </div>          
          </main>
      </div>
    </div>
  );
};

export default Main;
