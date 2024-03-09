import { ErrorIcon } from "react-hot-toast";
import GlobalStyle from "../../styles/global";

const NotFound = () => {
  return (
    <>
    <GlobalStyle />
      <div style={{ padding: '1rem', height: '100vh', backgroundColor: '#101010'}}>
        <div style={{display:" flex", gap:"1rem", alignItems: 'center'}}>
          <ErrorIcon />
          <h1>Error 404: Página não encontrada.</h1>
        </div>
      </div>
    </>
  );
};

export default NotFound;
