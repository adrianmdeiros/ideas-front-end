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
  StyledActions,
  StyledConfirmBox,
  StyledButtons,
  StyledDanger,
} from "./style";
import Button from "../Button/Button";
import { Edit, Trash2, User } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import api from "../../api/api";
import Modal from "../Modal/Modal";
import { Project } from "../../pages/MyProjects/MyProjects";
import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/AuthContext";

export type PostProps = {
  avatarUrl?: string;
  userName?: string;
  title?: string;
  description?: string;
  numberOfStudents?: number;
  projectType?: string;
  ccolor?: string;
  id?: string;
};

const Post: React.FC<PostProps> = ({
  id,
  ccolor,
  userName,
  title,
  description,
  numberOfStudents,
  projectType,
  avatarUrl,
}) => {
  const perfilImage = `https://suap.ifma.edu.br${avatarUrl}`;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext)
  const { data: myProjects, setData: setMyProjects } = useFetch<Project[]>(
    `https://api-projif.vercel.app/projects?userId=${user?.id}`
  );

  const location = useLocation()

  const handleNavigate = () => {
    navigate("/details");
  };

  const deletePost = async (e: any) => {
    e.preventDefault()
    
    await api.delete(`/projects/${id}`);
    setIsModalOpen(false)
    
    if(myProjects !== null) {
      const newProjectsList = myProjects.filter(project => {
        return project.id !== id
      })
      setMyProjects(newProjectsList)
    }

  };

  return (
    <StyledPost>
      <StyledProject>
        <StyledTop>
          <StyledAutor>
            <StyledUserPhoto src={perfilImage} />
            <StyledTitle>{userName}</StyledTitle>
          </StyledAutor>
          {location.pathname === '/projects' && (
            <StyledActions>
            <Edit cursor={"pointer"} />
            <Trash2 cursor={"pointer"} onClick={() => setIsModalOpen(true)} />
            <Modal
              isOpen={isModalOpen}
              setOpenModal={() => setIsModalOpen(!isModalOpen)}
            >
              <StyledConfirmBox>
                <StyledDanger>
                  <p>Tem Certeza que deseja excluir esse projeto?</p>
                </StyledDanger>
                <StyledButtons>
                  <Button
                    backgroundColor="transparent"
                    color="#f5f5f5"
                    borderRadius=".8rem"
                    hover="transparent"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                  >
                    cancelar
                  </Button>
                  <Button
                    backgroundColor="#f5f5f5"
                    color="#101010"
                    borderRadius=".8rem"
                    hover="#dedede"
                    onClick={deletePost}
                  >
                    Confirmar
                  </Button>
                </StyledButtons>
              </StyledConfirmBox>
            </Modal>
          </StyledActions>
          )}
        </StyledTop>
        <StyledMiddle>
          <StyledTitle>{title}</StyledTitle>
          <StyledDescription ccolor={ccolor}>{description}</StyledDescription>
        </StyledMiddle>
        <StyledBottom>
          <StyledReqContainer>
            <StyledProjectReq>
              <User size={18} />
              <StyledP>{numberOfStudents} Alunos</StyledP>
            </StyledProjectReq>
            <StyledProjectReq>
              <StyledColorTypeProject ccolor={ccolor} />
              <StyledP>{projectType}</StyledP>
            </StyledProjectReq>
          </StyledReqContainer>
          <Button
            type="submit"
            backgroundColor={"#2c2c2c"}
            color={"#d9d9d9"}
            width={"100%"}
            height={"100%"}
            hover={"#252525"}
            onClick={handleNavigate}
            borderRadius={".8rem"}
          >
            Ver mais
          </Button>
        </StyledBottom>
      </StyledProject>
    </StyledPost>
  );
};

export default Post;
