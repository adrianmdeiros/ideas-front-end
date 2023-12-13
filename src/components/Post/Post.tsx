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
  // StyledUserPhoto,
  StyledProject,
  StyledDescription,
  StyledActions,
  StyledConfirmBox,
  StyledButtons
} from "./style";
import Button from "../Button/Button";
import { AlertOctagon, Edit, Trash2, User } from "react-feather";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import ProjectDetails from "../../pages/ProjectDetails/ProjectDetails";
import EditProject from "../EditProject/EditProject";
import { Project } from "../../pages/MyProjects/MyProjects";

export type PostProps = {
  avatarUrl?: string;
  userName?: string;
  title?: string;
  description?: string;
  studentsRequired?: number;
  projectCategory?: string;
  ccolor?: string;
  id?: string;
  deleteProject?: (e: any) => void
  isExcluding?: boolean
  userCourse?: string
  userId?: number
  myProjects?: Project[] | null
  setMyProjects?: React.Dispatch<React.SetStateAction<Project[] | null>>
};

const Post: React.FC<PostProps> = ({
  id,
  userId,
  ccolor,
  userName,
  title,
  description,
  studentsRequired,
  projectCategory,
  avatarUrl,
  deleteProject,
  isExcluding,
  userCourse,
  myProjects,
  setMyProjects
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [IsProjectDetailsModalOpen, setIsProjectDetailsModalOpen] = useState(false);

  // const perfilImage = avatarUrl;
  const location = useLocation();
  
  return (
    <StyledPost>
      <StyledProject>
        <StyledTop>
          <StyledAutor>
            {/* <StyledUserPhoto src={perfilImage} /> */}
            <div>
              <StyledTitle>{userName}</StyledTitle>
              <StyledP>{userCourse}</StyledP>
            </div>
          </StyledAutor>
          {location.pathname === "/projects" && (
            <StyledActions>
              <Edit color="#818181" cursor={"pointer"} size={20} onClick={() => setIsEditModalOpen(true)} />
              <Trash2 color="#818181" size={22} cursor={"pointer"} onClick={() => setIsModalOpen(true)} />
              <Modal
                isOpen={isModalOpen}
                setOpenModal={() => setIsModalOpen(!isModalOpen)}
              >
                <StyledConfirmBox>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <AlertOctagon />
                    <p>Tem Certeza que deseja excluir esse projeto?</p>
                  </div>
                  <StyledButtons>
                    <Button
                      backgroundColor="transparent"
                      color="#f5f5f5"
                      borderRadius=".8rem"
                      hover="transparent"
                      onClick={() => setIsModalOpen(!isModalOpen)}
                    >
                      <p>
                        cancelar
                      </p>
                    </Button>
                    <Button
                      backgroundColor="#850004"
                      color="#f5f5f5"
                      borderRadius=".8rem"
                      hover="#6e0004c3"
                      onClick={deleteProject}
                      height="4rem"
                    >
                      {isExcluding ? (
                        <>
                          <Loader />
                          <p>Excluindo...</p>
                        </>
                      ) : (
                        <p>Confirmar</p>
                      )}
                    </Button>
                  </StyledButtons>
                </StyledConfirmBox>
              </Modal>
              <Modal isOpen={isEditModalOpen} setOpenModal={() => setIsEditModalOpen(!isEditModalOpen)}>
                <EditProject id={id} myProjects={myProjects} setMyProjects={setMyProjects} modalClose={() => setIsEditModalOpen(!isEditModalOpen)} />
              </Modal>
            </StyledActions>
          )}
        </StyledTop>
        <StyledMiddle>
          <StyledTitle>{title}</StyledTitle>
          <StyledDescription setMyProjects={setMyProjects} ccolor={ccolor}>
            {description ? description?.length > 50 ? description?.slice(0, 60) + '...' : description : "Não há descrição"}
          </StyledDescription>
        </StyledMiddle>
        <StyledBottom>
          <StyledReqContainer>
            <StyledProjectReq>
              <User size={18} />
              <StyledP>{studentsRequired} aluno(s)</StyledP>
            </StyledProjectReq>
            <StyledProjectReq>
              <StyledColorTypeProject setMyProjects={setMyProjects} ccolor={ccolor}/>
              <StyledP>{projectCategory}</StyledP>
            </StyledProjectReq>
          </StyledReqContainer>

          <Button
            backgroundColor={"#2c2c2c"}
            color={"#d9d9d9"}
            width={"100%"}
            height={"100%"}
            hover={"#252525"}
            onClick={() => setIsProjectDetailsModalOpen(true)}
            borderRadius={".8rem"}
          >
            Ver mais
          </Button>
        </StyledBottom>
        <Modal isOpen={IsProjectDetailsModalOpen} setOpenModal={() => setIsProjectDetailsModalOpen(!IsProjectDetailsModalOpen)}>
          <ProjectDetails
            userId={userId}
            title={title}
            description={description}
            userName={userName}
            userCourse={userCourse}
            avatarUrl={avatarUrl}
            ccolor={ccolor}
            studentsRequired={studentsRequired}
            projectCategory={projectCategory}
          />
        </Modal>

      </StyledProject>
    </StyledPost>
  );
};

export default Post;
