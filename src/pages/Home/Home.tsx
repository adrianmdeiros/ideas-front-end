import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import GlobalStyle from "../../styles/global";
import { CheckCircle, LogIn, Search, Share2, User } from "react-feather";
import LogoHome from "../../assets/LogoMain.svg";
import Banner from "../../assets/Banner.png";
import styles from "./Home.module.css";
import classNames from "classnames/bind";
import Header from "../../components/Header/Header";

const cx = classNames.bind(styles);

const Home: React.FC = () => {
  const navigate = useNavigate();

  const actualYear = new Date().getFullYear()


  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <GlobalStyle />
      <div className={styles.container}>
        <Header height="9rem" padding="0 2rem" position="absolute" zIndex="1">
          <Link to={'/'}>
            <img src={LogoHome} alt="logo" />
          </Link>
          <Button
            backgroundColor={"#FF7A00"}
            color={"#f5f5f5"}
            width={"12rem"}
            height={"4.8rem"}
            hover={"#e46e00"}
            onClick={handleLogin}
            borderRadius={'.8rem'}
          >
            Entrar
            <LogIn />
          </Button>
        </Header>
        <main>
          <div className={styles.banner}>
            <img src={Banner} alt="banner-principal" />
            <h2>Encontre oportunidades de projeto de pesquisa!</h2>
          </div>
          <div className={styles.stepsContainer}>
            <h1>Como funciona?</h1>
            <div className={styles.stepsWrapper}>
              <div className={cx("step", "step1")}>
                <div className={styles.top}>
                  <h1>01</h1>
                </div>
                <div className={styles.middle}>
                  <User size={48} />
                  <h2>Faça Login</h2>
                </div>
                <div className={styles.bottom}>
                  <p>Entre com suas credenciais do SUAP</p>
                </div>
              </div>
              <div className={cx("step", "step2")}>
                <div className={styles.top}>
                  <h1>02</h1>
                </div>
                <div className={styles.middle}>
                  <Search size={48} />
                  <h2>Encontre ideias</h2>
                </div>
                <div className={styles.bottom}>
                  <p>Visualize as oportunidades de projeto no seu feed</p>
                </div>
              </div>
              <div className={cx("step", "step3")}>
                <div className={styles.top}>
                  <h1>03</h1>
                </div>
                <div className={styles.middle}>
                  <Share2 size={48} />
                  <h2>Compartilhe sua ideia</h2>
                </div>
                <div className={styles.bottom}>
                  <p>Cadastre uma ideia e encontre pessoas interessadas</p>
                </div>
              </div>
              <div className={cx("step", "step4")}>
                <div className={styles.top}>
                  <h1>04</h1>
                </div>
                <div className={styles.middle}>
                  <CheckCircle size={48} />
                  <h2>Conecte-se</h2>
                </div>
                <div className={styles.bottom}>
                  <p>Entre em contato com o dono da ideia e mãos a obra!</p>
                </div>
              </div>
            </div>
            </div>
        </main>
        <div className={styles.footer}>
          <p>
            Developed by{" "}
            <a className={styles.link} href="https://github.com/adrianmedeirosdev">
              adrianmedeirosdev
            </a>
          </p>
          <p>PROJIF {actualYear} © - Todos os direitos reservados</p>
        </div>
      </div>
    </>
  );
};

export default Home;
