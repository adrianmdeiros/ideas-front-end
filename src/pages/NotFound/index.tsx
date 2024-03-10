import { ArrowLeft } from "react-feather";
import { ErrorIcon } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate()
  const handleNavigate = () => navigate(-1)
  return (
    <>
      <div style={{ padding: '1rem', height: '100vh', backgroundColor: '#101010' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: '1rem', border: 'none', borderRadius: '.8rem', padding: '.8rem 1.6rem', cursor: 'pointer' }} onClick={handleNavigate}> <ArrowLeft /> <b>Voltar</b></button>
        <br />
        <div style={{ display: " flex", gap: "1rem", alignItems: 'center' }}>
          <ErrorIcon />
          <h1>Erro 404: Página não encontrada.</h1>
        </div>
      </div>
    </>
  );
};

export default NotFound;
