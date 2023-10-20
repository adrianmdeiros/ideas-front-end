import {
  StyledPost,
  StyledAutor,
  StyledTop,
  StyledTitle,
  StyledBottom,
  StyledColorTypeProject,
  StyledMiddle,
  StyledP,
  StyledProjectReq,
  StyledReqContainer,
  StyledUserPhoto,
  StyledProject,
  StyledDescription,
} from "./style";
import Button from "../Button/Button";
import { MoreVertical, User } from "react-feather";
import { useNavigate } from "react-router-dom";
import React from "react";

export type PostProps = {
  avatarUrl?: string
  userName?: string
  title?: string
  description?: string
  numberOfStudents?: number
  projectType?: string
  ccolor?: string
}

const Post: React.FC<PostProps> = ({ ccolor, userName, title, description, numberOfStudents, projectType, avatarUrl}) => {
  const perfilImage = `https://suap.ifma.edu.br${avatarUrl}`
  const navigate = useNavigate()
  
  const handleNavigate = () => {
    navigate('/details')
  }

  return (
    <StyledPost> 
      <StyledProject >
      <StyledTop >
        <StyledAutor >
          <StyledUserPhoto src={perfilImage} />
          <StyledTitle>{userName}</StyledTitle>
        </StyledAutor>
        <MoreVertical cursor={'pointer'}/>
      </StyledTop>
        <StyledMiddle >
          <StyledTitle>{title}</StyledTitle>
          <StyledDescription ccolor={ccolor}>{description}</StyledDescription>
        </StyledMiddle>
        <StyledBottom>
          <StyledReqContainer >
            <StyledProjectReq >
              <User size={18} />
              <StyledP>{numberOfStudents} Alunos</StyledP>
            </StyledProjectReq>
            <StyledProjectReq >
              <StyledColorTypeProject ccolor={ccolor}/>
              <StyledP>{projectType}</StyledP>
            </StyledProjectReq>
          </StyledReqContainer>
          <Button
            backgroundColor={"#2c2c2c"}
            color={"#d9d9d9"}
            width={"100%"}
            height={"100%"}
            hover={"#252525"}
            onClick={handleNavigate}
            borderRadius={'.8rem'}
          >
            Ver mais
          </Button>
        </StyledBottom>
      </StyledProject>
    </StyledPost>
  );
};

export default Post;
