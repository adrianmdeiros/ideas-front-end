import { useState, useContext } from "react";
import styles from "./ProjectForm.module.css";
import Button from "../Button/Button";
import { Minus, Plus } from "react-feather";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../api/api";

type Category = {
  id: number;
  name: string;
  color: string
};

const ProjectForm = () => {
  const { data: categories, isFetching } = useFetch<Category[]>(
    "https://api-projif.vercel.app/categories"
  );

  const { user } = useContext(AuthContext)
    
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [studentsRequired, setStudentsRequired] = useState(1);
  const [categoryId, setCategoryId] = useState(0)

  const addStudent = (e: any) => {
    e.preventDefault();
    if (studentsRequired < 5) {
      setStudentsRequired(studentsRequired + 1);
    }
  };

  const removeStudent = (e: any) => {
    e.preventDefault();
    if (studentsRequired > 1) {
      setStudentsRequired(studentsRequired - 1);
    }
  };

    const createProject = async () => {
      const project = {
        title,
        description,
        studentsRequired,
        categoryId,
        userId: user?.id 
      }

      try {
        const response = await api.post('/projects', project)
        window.location.reload()
        return response.data
      } catch (err) {
        alert("Esse projeto já existe!")
        return console.log(err);
      }
    };

  return (
    <>
      <h2 className={styles.title}>Adicionar Projeto</h2>
      <form className={styles.projectForm}>
        <div className={styles.projectTitleContainer}>
          <label htmlFor="title">Titulo</label>
          <input
            id="title"
            type="text"
            required={true}
            placeholder="Digite o título do seu projeto..."
            maxLength={100}
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.description}>
          <label htmlFor="descriptionContainer">Descrição</label>
          <textarea
            id="description"
            name="description"
            placeholder="Descreva seu projeto..."
            required={true}
            cols={30}
            rows={6}
            maxLength={500}
            className={styles.descriptionText}
            onChange={(e) => setDescription(e.target.value)}
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
            <input
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
        <div className={styles.projectCategoryContainer}>
          <label htmlFor="projectCategory">Categoria do projeto</label>
          {isFetching && <Loader />}
          {categories?.map((category) => (
            <>
              <input
                required={true}
                type="radio"
                id={category.name}
                key={category.id}
                name="projectCategory"
                className={styles.checkbox}
                onClick={() => {
                  setCategoryId(category.id)
                }}
                />
              <label htmlFor={category.name} className={styles.type}>
                {category.name}
              </label>
            </>
          ))}
        </div>
        <Button
          type="submit"
          backgroundColor="#f5f5f5"
          borderRadius=".5rem"
          color="#101010"
          hover="#dedede"
          width="100%"
          onClick={createProject}
        >
          Publicar
        </Button>
      </form>
    </>
  );
};

export default ProjectForm;
