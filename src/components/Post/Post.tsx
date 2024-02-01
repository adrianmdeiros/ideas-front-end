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
import { AlertOctagon, AlertTriangle, DollarSign, Edit, Star, Trash2, User } from "react-feather";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import EditProject from "../EditProject/EditProject";
import { Project } from "../../pages/MyProjects/MyProjects";

export type PostProps = {
  id?: string;
  title?: string;
  description?: string;
  studentsRequired?: number;
  projectCategory?: string;
  modality?: string;
  amountUsersInterested?: number
  avatarUrl?: string;
  userName?: string;
  ccolor?: string;
  isExcluding?: boolean
  userCourse?: string
  userId?: number
  deleteProject?: (e: any) => void
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
  modality,
  amountUsersInterested,
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
    <StyledPost ccolor={ccolor}>
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
              <Edit color="#818181" cursor={"pointer"} size={23} onClick={() => setIsEditModalOpen(true)} />
              <Trash2 color="#818181" size={24} cursor={"pointer"} onClick={() => setIsModalOpen(true)} />
              <Modal
                isOpen={isModalOpen}
                setOpenModal={() => setIsModalOpen(!isModalOpen)}
              >
                <StyledConfirmBox>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <AlertTriangle />
                    <p>Tem certeza que deseja excluir esse projeto?</p>
                  </div>
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
                      hover="#ccc"
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
        <StyledProjectReq>
          <StyledColorTypeProject setMyProjects={setMyProjects} ccolor={ccolor} />
          <StyledP>{projectCategory}</StyledP>
        </StyledProjectReq>
        <StyledBottom>
          <StyledReqContainer>
            {/* <StyledProjectReq>
              <Star size={18} />
              <StyledP>{amountUsersInterested ? amountUsersInterested : 0}</StyledP>
            </StyledProjectReq> */}
            <div style={{ display: 'flex', alignItems: 'end', gap: '1rem' }}>
                <StyledProjectReq>
                  <DollarSign size={18} />
                  <StyledP>{modality ? modality : '-'}</StyledP>
                </StyledProjectReq>
              <div>
              <StyledProjectReq>
                <User size={18} />
                <StyledP>{studentsRequired} aluno(s)</StyledP>
              </StyledProjectReq>
              </div>
            </div>
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
            Saiba mais
          </Button>
        </StyledBottom>
        <Modal isOpen={IsProjectDetailsModalOpen} setOpenModal={() => setIsProjectDetailsModalOpen(!IsProjectDetailsModalOpen)}>
          <ProjectDetails
            id={id}
            userId={userId}
            title={title}
            description={description}
            userName={userName}
            userCourse={userCourse}
            avatarUrl={avatarUrl}
            ccolor={ccolor}
            studentsRequired={studentsRequired}
            projectCategory={projectCategory}
            modality={modality}
            amountUsersInterested={amountUsersInterested}
          />
        </Modal>

      </StyledProject>
    </StyledPost>
  );
};

export default Post;
