import { StyledCard } from "./style";

export type TagProps = {
  color: string;
  children: React.ReactNode
  onClick?: () => void
};




const Tag: React.FC<TagProps> = ({ children, color, onClick }) => {
  // const [active, setActive] = useState(false);

  // const handleClick = () => {
  //   setActive(false);
  //   onClick && onClick();
  // };

  return <StyledCard
    color={color}
    onClick={onClick}
  >
    {children}
  </StyledCard>;
};

export default Tag;
