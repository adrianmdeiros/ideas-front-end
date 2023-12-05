import GlobalStyle from "../../styles/global";
import styles from "./Login.module.css";
import Banner from "../../assets/Banner.png";
import Logo from "../../assets/LogoHome.svg";
import Button from "../../components/Button/Button";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Loader from "../../components/Loader/Loader";
import { Eye, EyeOff, Info } from "react-feather";
import toast from "react-hot-toast";



const Login: React.FC = () => {
  const { register, handleSubmit, setFocus } = useForm();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/main')
    }
  }, [])


  const handleSignIn = async (data: any) => {
    setIsLogging(true);
    try {
      const isLogged = await auth.signIn(data);
      if (isLogged) {
        navigate("/main");
        setIsLogging(false);
        toast.success('Login realizado com sucesso.')
      }
    } catch (e) {
      toast.error('Matrícula ou senha incorretas. Tente novamente. Caso o erro persista, verifique se o site do SUAP está funcionando normalmente. Se não estiver, será necessário aguardar o retorno do mesmo para tentar novamente.');
      setIsLogging(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setFocus('password')
  }

  return (
    <>
      <GlobalStyle />
      <img className={styles.background} src={Banner} />
      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <div className={styles.top}>
            <Link to={"/"}>
              <img src={Logo} alt="Logo do app" />
            </Link>
            <div className={styles.tip}>
              <Info color="#808080"/> <p>Entre com matrícula e senha do SUAP.</p>
            </div>
          </div>
          <form className={styles.middle} onSubmit={handleSubmit(handleSignIn)}>
            <div className={styles.field}>
              <label htmlFor="matricula">Matrícula</label>
              <input
                placeholder="Digite sua matrícula..."
                required={true}
                className={styles.input}
                type="text"
                id="matricula"
                {...register("matricula")}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="password">Senha</label>
              <input
                placeholder="Digite sua senha..."
                required={true}
                className={styles.input}
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
              />
              <span className={styles.eyeIcon}>
              {showPassword ? (
                <Eye onClick={togglePasswordVisibility} />
              ) : (
                <EyeOff onClick={togglePasswordVisibility} />
              )}
              </span>
            </div>
            <Button
              backgroundColor={"#f5f5f5"}
              color={"#101010"}
              width={"100%"}
              height={"68%"}
              hover={"#ccc"}
              borderRadius={".8rem"}
            >
              {isLogging ? (
                <>
                  <Loader />
                  <p>Entrando</p>
                </>
              ) : (
                <p>Entrar</p>
              )}
            </Button>
          </form>
          <div className={styles.bottom}>
            <Link
              className={styles.link}
              to="https://suap.ifma.edu.br/comum/solicitar_trocar_senha/"
              target="_blank"
            >
              Esqueceu sua senha?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
