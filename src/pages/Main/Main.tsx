import GlobalStyle from "../../styles/global";
import styles from "./Main.module.css";
// import Post from "../../components/Post/Post";
import Header from "../../components/Header/Header";
import Logo from '../../assets/LogoMain.svg'
import TabBar from "../../components/TabBar/TabBar";
import { AlertCircle } from "react-feather";
import ClickableIcon from "../../components/ClickableIcon/ClickableIcon";



const Main: React.FC= () => {
  
  return (
    <>
      <GlobalStyle />
      <div className={styles.container}>
        <Header>
          <img src={Logo} alt="logo" /> 
          <ClickableIcon onClick={() => alert('ir para notificações')}/>
          {/* <h2>Home</h2> */}
        </Header>
        <hr />
        <main>
          <div className={styles.feed}>
            <div className={styles.postsContainer}>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <AlertCircle size={32} />
                <p>Os projetos postados por outras pessoas ficarão aqui...</p>
              </div>
              {/* <Post /> */}
              {/* <Post /> */}
            </div>
          </div>
          
     
          <TabBar />
          
        </main>
      </div>
    </>
  );
};

export default Main;
