import { ErrorIcon } from "react-hot-toast";

const NotFound = () => {
  return (
      <div style={{display: 'grid', height: '100vh', placeContent: 'center', gap:'2rem'}}>
        <div style={{display:" flex", gap:"2rem", alignItems: 'center'}}>
          <ErrorIcon />
          <h1>Error 404: Not Found!</h1>
        </div>
      </div>
  );
};

export default NotFound;
