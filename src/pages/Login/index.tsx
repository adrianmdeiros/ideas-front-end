import styles from "./styles.module.css";
import Banner from "../../assets/Banner.png";
import Logo from "../../assets/LogoHome.png";
import Button from "../../components/Button";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";
import Loader from "../../components/Loader";
import { Eye, EyeOff, Info } from "react-feather";
import toast from "react-hot-toast";



const Login: React.FC = () => {
  const { register, handleSubmit, setFocus } = useForm();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogging, setIsLogging] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(4);

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
      setIsLogging(false);
      if(loginAttempts > 0){
       setLoginAttempts(loginAttempts - 1); 
      }else{
        setLoginAttempts(4)
        window.location.reload()
        window.open('https://suap.ifma.edu.br/accounts/login', '_blank')
      }
      toast.error('Matrícula ou senha incorretas.', {duration: 6000});
      toast.error(`Você tem ${loginAttempts} tentativas.`, {duration: 6000});
      toast.error(`Após isso você deverá fazer login no SUAP e retornar.`, {duration: 6000});
    }
  };

  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setFocus('password')
  }

  return (
    <>
      <img className={styles.background} src={Banner} />
      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <div className={styles.top}>
            <Link to={"/"}>
              <img src={Logo} alt="Logo do app" height={120} />
            </Link>
            <div className={styles.tip}>
              <Info color="#cecece"/> <p>Entre com matrícula e senha do SUAP.</p>
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
              terciary
              disabled={isLogging}
            >
              {isLogging ? (
                <>
                  <Loader />
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
