import { Tool } from "react-feather";
import GlobalStyle from "../../styles/global";

const NotFound = () => {
  return (
    <>
      <GlobalStyle />
      <div style={{display: 'grid', height: '100vh', placeContent: 'center', gap:'2rem'}}>
        <div style={{display:" flex", gap:"2rem", alignItems: 'center'}}>
          <Tool size={48}/>
          <h1>Error 404: Not Found!</h1>
        </div>
      </div>
    </>
  );
};

export default NotFound;
