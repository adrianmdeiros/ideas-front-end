import { AlertCircle, Minus, Plus } from "react-feather";
import GlobalStyle from "../../styles/global";
import styles from "./Projects.module.css";
import Header from "../../components/Header/Header";
import TabBar from "../../components/TabBar/TabBar";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";
import Input from "../../components/Input/Input";

const Projects = () => {
  const [numberOfStudents, setNumberOfStudents] = useState(1);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addStudent = (e: any) => {
    e.preventDefault();
    if (numberOfStudents < 5) {
      setNumberOfStudents(numberOfStudents + 1);
    }
  };

  const removeStudent = (e: any) => {
    e.preventDefault();
    if (numberOfStudents > 1) {
      setNumberOfStudents(numberOfStudents - 1);
    }
  };

  const handleTituloChange = (e: any) => {
    setProjectTitle(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setProjectDescription(e.target.value);
  };

  return (
    <>
      <div className={styles.body}>
        <GlobalStyle />
        <TabBar/>
        <div className={styles.container}>
         <Header
            height="9rem"
            position="fixed"
            padding="2rem"
            backgroundColor="#101010"
          >
            <h2>Meus Projetos</h2>
            <Button
              backgroundColor="#ff7a00"
              borderRadius=".5rem"
              color="#f5f5f5"
              hover="#ff7b00e8"
              height="4.2rem"
              onClick={() => setIsModalOpen(true)}
              >
              Novo
              <Plus size={18} />
            </Button>
          </Header>
          <main>
            <div className={styles.projectsContainer}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <AlertCircle size={32} />
                <p>Os projetos que você adicionar ficarão aqui...</p>
              </div>
            </div>
              <div className={styles.modalContainer}>
            <Modal isOpen={isModalOpen} setOpenModal={() => setIsModalOpen(!isModalOpen)}>
                <h2 className={styles.title}>Adicionar Projeto</h2>
                <form className={styles.projectForm}>
                  <div className={styles.projectTitleContainer}>
                    <label htmlFor="title">Titulo</label>
                    <input className={styles.input}
                      type="text"
                      id="title"
                      name="title"
                      required={true}
                      placeholder="Digite o título do seu projeto..."
                      onChange={handleTituloChange}
                      value={projectTitle}
                      maxLength={100}
                    />
                  </div>
                  <div className={styles.description}>
                    <label htmlFor="descriptionContainer">Descrição</label>
                    <textarea
                      required={true}
                      className={styles.descriptionText}
                      name="description"
                      id="description"
                      cols={30}
                      rows={6}
                      value={projectDescription}
                      placeholder="Descreva seu projeto..."
                      onChange={handleDescriptionChange}
                      maxLength={500}
                    />
                  </div>
                  <div className={styles.numberOfStudentsContainer}>
                    <label htmlFor="numberOfStudents">
                      Quantidade de alunos
                    </label>
                    <div className={styles.addOrRemoveStudentsContainer}>
                      <Button
                        backgroundColor="#f5f5f5"
                        color="#101010"
                        borderRadius=".8rem"
                        hover="#dedede"
                        onClick={removeStudent}
                        width="38%"
                      >
                        <Minus />
                      </Button>
                      <div
                        id="numberOfStudents"
                        className={styles.numberOfStudents}
                      >
                        {numberOfStudents}
                      </div>
                      <Button
                        width="38%"
                        backgroundColor="#f5f5f5"
                        color="#101010"
                        borderRadius=".8rem"
                        hover="#dedede"
                        onClick={addStudent}
                      >
                        <Plus />
                      </Button>
                    </div>
                  </div>
                  <div id="projectType" className={styles.projectTypeContainer}>
                    <label htmlFor="projectType">Tipo do projeto</label>

                    <input
                      name="projectType"
                      type="radio"
                      id="pibic"
                      className={styles.checkbox}
                    />
                    <label htmlFor="pibic" className={styles.type}>
                      PIBIC
                    </label>
                    <input
                      name="projectType"
                      type="radio"
                      id="pibit"
                      className={styles.checkbox}
                    />
                    <label htmlFor="pibit" className={styles.type}>
                      PIBIT
                    </label>
                    <input
                      name="projectType"
                      type="radio"
                      id="pivic"
                      className={styles.checkbox}
                    />
                    <label htmlFor="pivic" className={styles.type}>
                      PIVIC
                    </label>
                    <input
                      name="projectType"
                      type="radio"
                      id="monografia"
                      className={styles.checkbox}
                    />
                    <label htmlFor="monografia" className={styles.type}>
                      MONOGRAFIA
                    </label>
                    <input
                      name="projectType"
                      type="radio"
                      id="outro"
                      className={styles.checkbox}
                    />
                    <label htmlFor="outro" className={styles.type}>
                      OUTRO
                    </label>
                  </div>
                  <Button
                    type="submit"
                    backgroundColor="#f5f5f5"
                    borderRadius=".5rem"
                    color="#101010"
                    hover="#dedede"
                    width="100%"
                  >
                    Publicar
                  </Button>
                </form>
            </Modal>
              </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Projects;
