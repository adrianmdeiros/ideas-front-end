import { useEffect, useState, FormEvent, useContext} from "react";
import api from "../../api/api";
import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./ProjectForm.module.css";
import Button from "../Button/Button";
import { Minus, Plus } from "react-feather";
import Loader from "../Loader/Loader";

export type Project = {
    id: string;
    title: string;
    description: string;
    studentsRequired: number;
    user: {
      id: number
      name: string;
      avatarURL: string;
      course: {
        id: number
        name: string
      };
    };
    category: {
      name: string;
      color: string
    };
  };

type Category = {
    id: number;
    name: string;
    color: string;
  };

  type ProjectFormProps = {
    myProjects?: Project[] | null
    setMyProjects: React.Dispatch<React.SetStateAction<Project[] | null>>
    modalClose: () => void
  }
  

const ProjectForm: React.FC<ProjectFormProps> = ({myProjects, setMyProjects, modalClose}) => {
  const auth = useContext(AuthContext);

    const { data: categories, isFetching: isFetchingCategory } = useFetch<
    Category[]
  >("https://api-projif.vercel.app/categories");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [studentsRequired, setStudentsRequired] = useState(1);
  const [categoryId, setCategoryId] = useState(0);
  const [isPublishing, setIsPublishing] = useState(false)

  useEffect(() => {
    if (categoryId === 4) {
      setStudentsRequired(1)
    }
  }, [categoryId])

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

  const createProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPublishing(true)

    try {
      const response = await api.post("/projects", {
        title,
        description,
        studentsRequired,
        categoryid: categoryId,
        userid: auth.user?.id
      });

      setIsPublishing(false);
      modalClose()

      setMyProjects(myProjects ? [...myProjects, response.data] : [response.data]);
    } catch (err) {
      alert(":( Ocorreu um erro! Talvez o projeto já exista... Tente um título diferente :)!");
      setIsPublishing(false);
    }

  };


  return (
    <>
                <h2 className={styles.title}>Adicionar Projeto</h2>
                <form className={styles.projectForm} onSubmit={createProject}>
                  <div className={styles.projectTitleContainer}>
                    <label htmlFor="title">Titulo</label>
                    <input
                      id="title"
                      type="text"
                      required={true}
                      placeholder="Digite o título do seu projeto..."
                      maxLength={150}
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
                      minLength={50}
                      maxLength={1000}
                      className={styles.descriptionText}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  {categoryId !== 4 && (
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
                  )}

                  <div className={styles.projectCategoryContainer}>
                    <label htmlFor="projectCategory">
                      Categoria do projeto
                    </label>
                    { isFetchingCategory && <Loader /> }
                    <ul className={styles.categories}>
                      {categories?.map((category) => (
                        <li key={category.id}>
                          <input
                            required={true}
                            type="radio"
                            id={category.name}
                            name="projectCategory"
                            className={styles.checkbox}
                            onClick={() => setCategoryId(category.id)}
                          />
                          <label
                            htmlFor={category.name}
                            className={styles.type}
                          >
                            {category.name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    backgroundColor="#f5f5f5"
                    borderRadius=".5rem"
                    color="#101010"
                    hover="#dedede"
                    width="100%"
                  >
                    {isPublishing ? (
                      <>
                        <Loader />
                        <p>Publicando...</p>
                      </>
                    ) : (
                      <p>Publicar</p>
                    )}
                  </Button>
                </form>
              </>
  )
}

export default ProjectForm