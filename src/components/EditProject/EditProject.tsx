import { useContext, useEffect, useState } from "react"
import { useFetch } from "../../hooks/useFetch"
import styles from './EdiProject.module.css'
import api from "../../api/api"
import { AuthContext } from "../../contexts/AuthContext"
import Button from "../Button/Button"
import { Minus, Plus } from "react-feather"
import Loader from "../Loader/Loader"
import { Project } from "../../pages/MyProjects/MyProjects"


type EditProjectProps = {
    id?: string
    myProjects?: Project[] | null
    setMyProjects: React.Dispatch<React.SetStateAction<Project[] | null>>
    modalClose: () => void
}

type Category = {
    id: number;
    name: string;
    color: string;
  };

const EditProject: React.FC<EditProjectProps> = ({ id, myProjects, setMyProjects, modalClose}) => {
  const auth = useContext(AuthContext);

  const { data: categories, isFetching: isFetchingCategory } = useFetch<
    Category[]
  >("https://api-projif.vercel.app/categories");  

  const { data: project } = useFetch<Project>(`https://api-projif.vercel.app/projects/${id}`)
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [studentsRequired, setStudentsRequired] = useState(1);
  const [categoryId, setCategoryId] = useState(0);
  const [isPublishing, setIsPublishing] = useState(false)

  useEffect(() => {
    if(project){
        setTitle(project.title);
        setDescription(project.description);
        setStudentsRequired(project.studentsRequired);
        setCategoryId(project.category.id);
    }
  }, [project])
  

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

  const updateProject = async (id?: string, e?: any) => {
    e.preventDefault();
    setIsPublishing(true)

    try{
        const response = await api.put(`/projects/${id}`, {
            title,
            description,
            studentsRequired,
            categoryid: categoryId,
            userid: auth.user?.id
        }) 
        
        if(myProjects != null){
          setMyProjects(myProjects.map(project=>{
            return project.id === id ? { ...response.data } : project
          }))
        }
      
      setIsPublishing(false);
      modalClose()

    }catch(e){
        alert("Ocorreu um erro ao atualizar o projeto!");
        console.log(e)
        setIsPublishing(false);
    }

  }

    return (  
        <>
                <h2 className={styles.title}>Editar Projeto</h2>
                <form className={styles.projectForm} onSubmit={(e) => updateProject(id, e)}>
                  <div className={styles.projectTitleContainer}>
                    <label htmlFor="title">Titulo</label>
                    <input
                      id="title"
                      type="text"
                      required={true}
                      placeholder="Digite o título do seu projeto..."
                      minLength={15}
                      maxLength={150}
                      className={styles.input}
                      value={title}
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
                      value={description}
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
                        <p>Salvando...</p>
                      </>
                    ) : (
                      <p>Salvar</p>
                    )}
                  </Button>
                </form>
              </>
  )
}

export default EditProject