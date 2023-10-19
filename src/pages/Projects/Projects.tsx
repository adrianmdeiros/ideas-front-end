import { AlertCircle, Minus, Plus } from "react-feather";
import GlobalStyle from "../../styles/global";
import styles from "./Projects.module.css";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";
import Menu from "../../components/Menu/Menu";
import { useForm } from "react-hook-form";

const Projects = () => {
  const [studentsRequired, setStudentsRequired] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm()

  const addStudent = (e: any) => {
    e.preventDefault();
    if (studentsRequired < 5) {
      setStudentsRequired(studentsRequired + 1)
      setValue('studentsRequired', studentsRequired + 1)
    }
  };
  
  const removeStudent = (e: any) => {
    e.preventDefault();
    if (studentsRequired > 1) {      
      setStudentsRequired(studentsRequired - 1)
      setValue('studentsRequired', studentsRequired - 1)
    }
  };



  const createProject = async (data: any) => {
    console.log(data);
  }

  return (
    <>
      <div className={styles.body}>
        <GlobalStyle />
        <Menu />
        <div className={styles.container}>
          <Header  padding="0 1rem" backgroundColor="#101010">
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
            <div className={styles.projectsContainer}>
              <hr />
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <AlertCircle size={32} />
                <p>Os projetos que você adicionar ficarão aqui...</p>
              </div>
            </div>
            <div className={styles.modalContainer}>
              <Modal
                isOpen={isModalOpen}
                setOpenModal={() => setIsModalOpen(!isModalOpen)}
              >
                <h2 className={styles.title}>Adicionar Projeto</h2>
                <form className={styles.projectForm} onSubmit={handleSubmit(createProject)}>
                  <div className={styles.projectTitleContainer}>
                    <label htmlFor="title">Titulo</label>
                    <input
                      {...register('title')}
                      id="title"
                      type="text"
                      required={true}
                      placeholder="Digite o título do seu projeto..."
                      maxLength={100}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.description}>
                    <label htmlFor="descriptionContainer">Descrição</label>
                    <textarea
                      {...register('description')}
                      id="description"
                      name="description"
                      placeholder="Descreva seu projeto..."
                      required={true}
                      cols={30}
                      rows={6}
                      maxLength={500}
                      className={styles.descriptionText}
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
                      <input
                        {...register('studentsRequired')}
                        type="number"
                        id="studentsRequired"
                        className={styles.numberOfStudents}
                        disabled={true}
                        value={studentsRequired}
                      />
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
                      {...register('pibic', { value: 'pibic'})}
                      name="projectCategory"
                      type="radio"
                      id="pibic"
                      className={styles.checkbox}
                      />
                    <label htmlFor="pibic" className={styles.type}>
                      PIBIC
                    </label>
                    <input
                      {...register('pibit', { value: 'pibit'})}
                      name="projectCategory"
                      type="radio"
                      id="pibit"
                      value='pibit'
                      className={styles.checkbox}
                      />
                    <label htmlFor="pibit" className={styles.type}>
                      PIBIT
                    </label>
                    <input
                      {...register('pivic', { value: 'pivic'})}
                      name="projectCategory"
                      type="radio"
                      id="pivic"
                      value='pivic'
                      className={styles.checkbox}
                      />
                    <label htmlFor="pivic" className={styles.type}>
                      PIVIC
                    </label>
                    <input
                      {...register('monografia', { value: 'monografia'})}
                      name="projectCategory"
                      type="radio"
                      id="monografia"
                      value='monografia'
                      className={styles.checkbox}
                      />
                    <label htmlFor="monografia" className={styles.type}>
                      MONOGRAFIA
                    </label>
                    <input
                      {...register('outro', { value: 'outro'})}
                      name="projectCategory"
                      type="radio"
                      id="outro"
                      value='outro'
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
        </div>
      </div>
    </>
  );
};

export default Projects;
