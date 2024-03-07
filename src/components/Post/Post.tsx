import React, { useContext, useState } from "react";
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
  StyledProject,
  StyledDescription,
  StyledActions,
  StyledConfirmBox,
  StyledButtons
} from "./style";
import { AlertTriangle, DollarSign, Edit, Trash2, User } from "react-feather";
import { useLocation } from "react-router-dom";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import EditProject from "../EditProject/EditProject";
import toast from "react-hot-toast";
import { MyProjectsContext } from "../../contexts/MyProjectsContext";
import api from "../../api/api";

export type PostProps = {
  id?: string
  username?: string
  userCourse?: string
  title?: string
  description?: string
  studentsRequired?: number
  modality?: string
  category?: string
  color?: string
  email?: string
  phone?: string
};

const Post: React.FC<PostProps> = (props: PostProps) => {
  const myProjectsContext = useContext(MyProjectsContext)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [IsProjectDetailsModalOpen, setIsProjectDetailsModalOpen] = useState(false);
  const [isExcluding, setIsExcluding] = useState(false)

  const location = useLocation();

  const deletePost = async (id: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsExcluding(true)
    try {
      await api.delete(`/projects/${id}`)

      if (myProjectsContext.myProjectIdeas) {
        myProjectsContext.setMyProjectIdeas(
          myProjectsContext.myProjectIdeas?.filter(myProjectIdea => {
            return myProjectIdea.id !== id
          })
        )
      }


      setIsExcluding(false);
      setIsModalOpen(false)
      toast.success('Ideia de projeto removida.')
    } catch (e) {
      console.error('Ocorreu um erro ao excluir o projeto:', e);
      toast.error('Ocorreu um erro ao excluir o projeto.');
      setIsExcluding(false);
    }


  }

  return (
    <StyledPost color={props.color}>
      <StyledProject>
        <StyledTop>
          <StyledAutor>
            <div>
              <StyledTitle>{props.username}</StyledTitle>
              <StyledP>{props.userCourse}</StyledP>
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
                      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => deletePost(props.id!, e)}
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
              <Modal isOpen={isEditModalOpen} setOpenModal={() =>
                setIsEditModalOpen(!isEditModalOpen)}>
                <EditProject id={props.id} modalClose={() =>
                  setIsEditModalOpen(!isEditModalOpen)}
                />
              </Modal>
            </StyledActions>
          )}
        </StyledTop>
        <StyledMiddle>
          <StyledTitle>{props.title}</StyledTitle>
          <StyledDescription color={props.color}>
            {props.description ? props.description?.length > 50 ? props.description?.slice(0, 60)
              + '...' : props.description : "Não há descrição"}
          </StyledDescription>
        </StyledMiddle>
        <StyledProjectReq>
          <StyledColorTypeProject color={props.color} />
          <StyledP>{props.category}</StyledP>
        </StyledProjectReq>
        <StyledBottom>
          <StyledReqContainer>
            <div style={{ display: 'flex', alignItems: 'end', gap: '1rem' }}>
              <StyledProjectReq>
                <DollarSign size={18} />
                <StyledP>{props.modality ?? '-'}</StyledP>
              </StyledProjectReq>
              <div>
                <StyledProjectReq>
                  <User size={18} />
                  <StyledP>{props.studentsRequired} aluno(s)</StyledP>
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
            title={props.title}
            description={props.description}
            username={props.username}
            userCourse={props.userCourse}
            color={props.color}
            studentsRequired={props.studentsRequired}
            category={props.category}
            modality={props.modality}
            email={props.email}
            phone={props.phone}
          />
        </Modal>
      </StyledProject>
    </StyledPost>
  );
};

export default Post;
