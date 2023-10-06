import GlobalStyle from "../../styles/global";
import styles from './Login.module.css'
import Banner from "../../assets/Banner.png";
import Logo from "../../assets/LogoHome.svg";
import Button from "../../components/Button/Button";
import { useContext } from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const { signIn } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSignIn = async (data: any) => {
    // if (!data) {
    //   return new Promise((_resolve, reject) => {
    //     reject( Error("Argumentos inválidos.") );
    //   });
    // }
    // try{
    //   await signIn(data)
    // }catch(error){  
    //   if (error) {
    //     throw new Error("Falha na autenticação.");
    //   }
    //   throw new Error("Falha na tentativa de autenticação.");
    // }
    navigate('/main')
  };

  return (
    <>
      <GlobalStyle />
      <img className={styles.background} src={Banner}/>
      <div className={styles.container}>
          <div className={styles.loginContainer}>
            <div className={styles.top}>
              <img src={Logo} alt="Logo do app" />
            </div>
            <form className={styles.middle} onSubmit={handleSubmit(handleSignIn)}>
              <div className={styles.field}>
                <label htmlFor="matricula">Matrícula</label>
                <input
                className={styles.input}
                type="text"
                id="matricula"
                {...register('matricula')}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="password">Senha</label>
                <input
                  className={styles.input}
                  type="password"
                  id="password"
                  {...register('password')}
                />
              </div>
              <Button
                type="submit"
                backgroundColor={"#f5f5f5"}
                color={"#101010"}
                width={"100%"}
                height={"68%"}
                hover={"#ccc"}
                borderRadius={".8rem"}
              >
                Entrar
              </Button>
            </form>
            <div className={styles.bottom}>
              <Link className={styles.link} to="https://suap.ifma.edu.br/comum/solicitar_trocar_senha/" target="_blank">
                Esqueceu sua senha?
              </Link>
            </div>
          </div>
      </div>
    </>
  );
};

export default Login;
