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
} from "./style";
import Button from "../Button/Button";
import { User } from "react-feather";
import { useNavigate } from "react-router-dom";
import React from "react";

type PostProps = {
  avatarUrl: string
  userName: string
  title: string
  description: string
  numberOfStudents: number
  projectType: string
  postDate: string
}

const Post: React.FC<PostProps> = ({userName, title, description, numberOfStudents, projectType, postDate}) => {
  const perfilImage = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
  const navigate = useNavigate()
  
  const handleNavigate = () => {
    navigate('/details')
  }

  return (
    <>
    <StyledPost>
      <StyledTop >
        <StyledAutor >
          <StyledUserPhoto src={perfilImage} />
          <StyledTitle>{userName}</StyledTitle>
        </StyledAutor>
        <StyledP>{postDate}</StyledP>
      </StyledTop>
      <StyledProject>
        <StyledMiddle >
          <StyledTitle>{title}</StyledTitle>
          <StyledP>{description}</StyledP>
        </StyledMiddle>
        <StyledBottom>
          <StyledReqContainer >
            <StyledProjectReq >
              <User size={18} />
              <StyledP>{numberOfStudents}</StyledP>
            </StyledProjectReq>
            <StyledProjectReq >
              <StyledColorTypeProject/>
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
    <hr />
    </>
  );
};

export default Post;
