import { StyledCard } from "./style";

export type TagProps = {
  active?: string
  color: string;
  children: React.ReactNode
  onClick?: () => void
};


const Tag: React.FC<TagProps> = ({ children, color, onClick, active }) => {

  return <StyledCard
    color={color}
    onClick={onClick}
    className={active}
  >
    {children}
  </StyledCard>;
};

export default Tag;
