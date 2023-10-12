import React, { useState } from "react";
import Header from "../../components/Header/Header";
import NavLink from "../../components/NavLink/NavLink";
import { ArrowLeft, Minus, Plus } from "react-feather";
import styles from "./NewProject.module.css";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import GlobalStyle from "../../styles/global";

const NewProject: React.FC = () => {
  const [numberOfStudents, setNumberOfStudents] = useState(1);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const addStudent = (e: any) => {
    e.preventDefault()
    if(numberOfStudents < 5){
      setNumberOfStudents(numberOfStudents + 1);
    }
  };

  const removeStudent = (e: any) => {
    e.preventDefault()
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
      <GlobalStyle />
      <div className={styles.container}>
        <Header
          backgroundColor="#101010"
          height="6rem"
          position="fixed"
          padding="0 2rem"
        >
          <NavLink
            to={"#"}
            icon={<ArrowLeft />}
            onClick={() => history.back()}
          />
          <h3 className={styles.title}>Novo Projeto</h3>
        </Header>

        <form className={styles.projectForm}>
          <div className={styles.projectTitleContainer}>
            <label htmlFor="title">Titulo</label>
            <Input
              required={true}
              name="title"
              type="text"
              id="title"
              backgroundColor="#252525"
              borderRadius=".5rem"
              border="none"
              placeholder="Digite o título"
              onChange={handleTituloChange}
              value={projectTitle}
              height="5rem"
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
              rows={10}
              value={projectDescription}
              placeholder="Descrição do projeto"
              onChange={handleDescriptionChange}
              maxLength={500}
            />
          </div>
          <div className={styles.numberOfStudentsContainer}>
            <label htmlFor="numberOfStudents">Quantidade de alunos</label>
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
              <div id="numberOfStudents" className={styles.numberOfStudents}>
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

            <input name="projectType" type="radio" id="pibic" className={styles.checkbox} />
            <label htmlFor="pibic" className={styles.type}>
              PIBIC
            </label>
            <input name="projectType" type="radio" id="pibit" className={styles.checkbox} />
            <label htmlFor="pibit" className={styles.type}>
              PIBIT
            </label>
            <input name="projectType" type="radio" id="pivic" className={styles.checkbox} />
            <label htmlFor="pivic" className={styles.type}>
              PIVIC
            </label>
            <input name="projectType" type="radio" id="monografia" className={styles.checkbox} />
            <label htmlFor="monografia" className={styles.type}>
              MONOGRAFIA
            </label>
            <input name="projectType" type="radio" id="outro" className={styles.checkbox} />
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
      </div>
    </>
  );
};

export default NewProject;
