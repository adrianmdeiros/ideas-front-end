import React, { useContext, useState } from "react";
import styles from './styles.module.css'
import { AlertOctagon, Edit, Trash2 } from "react-feather";
import { useLocation } from "react-router-dom";
import Button from "../Button";
import Modal from "../Modal";
import Loader from "../Loader";
import ProjectDetails from "../ProjectDetails";
import toast from "react-hot-toast";
import api from "../../api/api";
import { ServantProjectIdeasContext } from "../../contexts/ServantProjectIdeas";
import ProjectForm from "../ProjectForm";

export type PostProps = {
  id?: string
  title?: string
  description?: string
  studentsRequired?: number
  modality?: string
  category?: string
  username?: string
  email?: string
  phone?: string
  department?: string
};

const Post: React.FC<PostProps> = (props: PostProps) => {
  const servantProjectIdeasContext = useContext(ServantProjectIdeasContext)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [IsProjectDetailsModalOpen, setIsProjectDetailsModalOpen] = useState(false);
  const [isExcluding, setIsExcluding] = useState(false)

  const location = useLocation();

  const deletePost = async (id: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsExcluding(true)
    try {
      await api.delete(`/project-ideas/${id}`)

      if (servantProjectIdeasContext.servantProjectIdeas) {
        servantProjectIdeasContext.setServantProjectIdeas(
          servantProjectIdeasContext.servantProjectIdeas?.filter(serventProjectIdea => {
            return serventProjectIdea.id !== id
          })
        )
      }

      setIsExcluding(false);
      setIsModalOpen(false)
      toast.success('Ideia de projeto removida.')
    } catch (e) {
      toast.error('Ocorreu um erro ao excluir o projeto.');
      setIsExcluding(false);
    }

  }

  return (
    <div className={styles.container}>
      <div className={styles.project}>
        <div className={styles.top}>
          <div>
            <p className={styles.title}>{props.username}</p>
            <p className={styles.p}>{props.department}</p>
          </div>
          {location.pathname === "/projects" && (
            <div className={styles.actions}>
              <Edit color="#818181" cursor={"pointer"} size={23} onClick={() => setIsEditModalOpen(true)} />
              <Trash2 color="#818181" size={24} cursor={"pointer"} onClick={() => setIsModalOpen(true)} />
              <Modal
                isOpen={isModalOpen}
                setOpenModal={() => setIsModalOpen(!isModalOpen)}
              >
                <div className={styles.areYouSureModal}>
                  <div className={styles.areYouSureMessage}>
                    <AlertOctagon />
                    <p>Tem certeza que deseja excluir essa ideia de projeto?</p>
                  </div>
                  <div className={styles.areYouSureModalButtons}>
                    <Button
                      transparent
                      onClick={() => setIsModalOpen(!isModalOpen)}
                    >
                      cancelar
                    </Button>
                    <Button
                      danger
                      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => deletePost(props.id!, e)}
                      disabled={isExcluding}
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
                  </div>
                </div>
              </Modal>
              <ProjectForm id={props.id} isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} />
            </div>
          )}
        </div>
        <div className={styles.middle}>
          <p className={styles.title}>{props.title ? props.title?.length > 50 ? props.title?.slice(0, 60)
            + '...' : props.title : "Não há título"}</p>
          <p className={styles.description}>
            {props.description ? props.description?.length > 50 ? props.description?.slice(0, 60)
              + '...' : props.description : "Não há descrição"}
          </p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.tags}>
            <div className={styles.tag}>
              🧪
              <p className={styles.p}>{props.category}</p>
            </div>
            <div className={styles.tag}>
              ✨
              <p className={styles.p}>{props.modality ? props.modality : '-'}</p>
            </div>
            <div className={styles.tag}>
              👨‍🎓
              <p className={styles.p}>{props.studentsRequired} ALUNO(S)</p>
            </div>
          </div>
          <Button
            quaternary
            onClick={() => setIsProjectDetailsModalOpen(true)}
          >
           Ver Detalhes
          </Button>
        </div>
        <Modal isOpen={IsProjectDetailsModalOpen} setOpenModal={() =>
          setIsProjectDetailsModalOpen(!IsProjectDetailsModalOpen)}
        >
          <ProjectDetails
            title={props.title}
            description={props.description}
            studentsRequired={props.studentsRequired}
            modality={props.modality}
            category={props.category}
            username={props.username}
            email={props.email}
            phone={props.phone}
            department={props.department}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Post;
