import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { CheckCircle, LogIn, Search, Share2, User } from "react-feather";
import LogoHome from "../../assets/LogoHome.png";
import Banner from "../../assets/Banner.jpg";
import styles from "./styles.module.css";
import classNames from "classnames/bind";
import Header from "../../components/Header";
import CookiesPopUp from "../../components/CookiesPopUp";

const cx = classNames.bind(styles);

const Home: React.FC = () => {
  const navigate = useNavigate();
  const actualYear = new Date().getFullYear()

  return (
    <>
      <div className={styles.container}>
        <Header>
          <Link to={'/'}>
            <img style={{marginTop: '4rem'}} src={LogoHome} alt="Logo Projif" height={100} />
          </Link>
          <Button
            primary
            gap
            onClick={() => navigate("/login")}
          >
            Entrar
            <LogIn />
          </Button>
        </Header>
        <main>
          <div className={styles.banner}>
            <img src={Banner} alt="Imagem com uma mesa cheia de papeis com projetos, um smartphone e lapiseiras." />
            <h2>Encontre oportunidades de projeto de pesquisa!</h2>
          </div>
          <div className={styles.stepsContainer}>
            <h1>Como funciona?</h1>
            <div className={styles.stepsWrapper}>
              <div className={cx("step", "step1")}>
                <div className={styles.middle}>
                  <User size={48} />
                  <h2>Fácil acesso</h2>
                </div>
                <div className={styles.bottom}>
                  <p>O acesso é integrado com o SUAP!</p>
                </div>
              </div>
              <div className={cx("step", "step3")}>
                <div className={styles.middle}>
                  <Share2 size={48} />
                  <h2>Ideias compartilhadas</h2>
                </div>
                <div className={styles.bottom}>
                  <p>Professores compartilham oportunidades de projetos de pesquisa</p>
                </div>
              </div>
              <div className={cx("step", "step2")}>
                <div className={styles.middle}>
                  <Search size={48} />
                  <h2>Projetos disponíveis</h2>
                </div>
                <div className={styles.bottom}>
                  <p>Alunos encontram oportunidades de projeto de pesquisa</p>
                </div>
              </div>
              <div className={cx("step", "step4")}>
                <div className={styles.middle}>
                  <CheckCircle size={48} />
                  <h2>Conexão</h2>
                </div>
                <div className={styles.bottom}>
                  <p>Alunos podem encontrar os contatos do professor.</p>
                </div>
              </div>
            </div>
          </div>
          <CookiesPopUp />
        </main>
        <div className={styles.footer}>
          <p>iDeas {actualYear} © - Todos os direitos reservados.</p>
        </div>
      </div>
    </>
  );
};
export default Home;
