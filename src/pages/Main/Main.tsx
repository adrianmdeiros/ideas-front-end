import GlobalStyle from "../../styles/global";
import styles from "./Main.module.css";
import Header from "../../components/Header/Header";
import TabBar from "../../components/TabBar/TabBar";
import { AlertCircle } from "react-feather";


const Main: React.FC= () => {

  return (
    <>
      <GlobalStyle />
      <TabBar />
      <div className={styles.container}>
        <Header>
          {/* <img src={Logo} alt="logo" />  */}
          <h2>Descubra</h2>
        </Header>
        <hr />
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
    </>
  );
};

export default Main;
