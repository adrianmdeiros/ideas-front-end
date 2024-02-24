import { AlertCircle, Minus, Plus, PlusCircle } from "react-feather";
import GlobalStyle from "../../styles/global";
import styles from "./MyProjects.module.css";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { FormEvent, useContext, useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/AuthContext";
import { ProjectsContext } from "../../contexts/ProjectsContext";
import api from "../../api/api";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import toast from "react-hot-toast";
import { Category } from "../../types/Category";
import { Project } from "../../types/Project";


const MyProjects = () => {
  const auth = useContext(AuthContext);
  const projectsData = useContext(ProjectsContext)

  const { data: categories, isFetching: isFetchingCategory } = useFetch<
    Category[]
  >(`${api.defaults.baseURL}/categories`)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modality, setModality] = useState("");
  const [studentsRequired, setStudentsRequired] = useState(1);

  const [categoryId, setCategoryId] = useState(0);
  const [isPublishing, setIsPublishing] = useState(false)


  useEffect(() => {
    if (categoryId === 6) {
      setStudentsRequired(1)
      setModality('')
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
        modality,
        categoryid: categoryId,
        userid: auth.user?.id
      });

      toast.success('Ideia de projeto criada!')

      setIsPublishing(false);
      setIsModalOpen(false)

      projectsData.setProjects(response.data);
    } catch (e) {
      toast.error("Ocorreu um erro. Talvez já exista uma ideia de projeto com esse título.");
      setIsPublishing(false);
    }
    setCategoryId(0)
    setModality('')
  };



  return (
    <>
        <div className={styles.body}>
          <GlobalStyle />
          <Menu />
          <div className={styles.container}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between  ', backgroundColor: "#101010" }} >
              <h1>Meus Projetos</h1>
              <Button
                backgroundColor="#ff7a00"
                borderRadius=".5rem"
                color="#f5f5f5"
                hover="#ff7b00e8"
                height="4.8rem"
                onClick={() => setIsModalOpen(true)}
              >
                <PlusCircle size={18} />
                Novo
              </Button>
            </header>
            <div className={styles.projectsContainer}>
              <ul className={styles.postsContainer}>
                {projectsData.projects?.projectsList?.map((project: Project) => (
                  <li key={project.title}>
                    <Post
                      id={project.id}
                      username={project.user.name}
                      userCourse={project.user.course.name}
                      title={project.title}
                      description={project.description}
                      studentsRequired={project.studentsRequired}
                      modality={project.modality}
                      category={project.category.name}
                      color={project.category.color}
                      email={project.user.email}
                      phone={project.user.phone}
                    />
                  </li>
                ))}
              </ul>
              {!projectsData.projects?.projectsList && !projectsData.isFetching && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <AlertCircle size={32} />
                  <p>Você ainda não adicionou nenhuma ideia de projeto.</p>
                </div>
              )}
              {projectsData.isFetching && <Loader color={"#ff7a00"} />}
            </div>
            <div className={styles.modalContainer}>
              <Modal
                isOpen={isModalOpen}
                setOpenModal={() => setIsModalOpen(!isModalOpen)}
              >
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
                        minLength={20}
                        maxLength={1000}
                        className={styles.descriptionText}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    {categoryId !== 6 && (
                      <>
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
                        <div className={styles.projectCategoryContainer}>
                          <label htmlFor="projectModality">
                            Modalidade do projeto
                          </label>
                          <ul className={styles.modalities}>
                            <li key={'bolsista'}>
                              <input id="bolsista" className={styles.checkbox} required={false} type="radio" name="projectModality" onClick={() => setModality("Bolsista")} />
                              <label
                                htmlFor="bolsista"
                                className={styles.type}>
                                Bolsista
                              </label>
                            </li>
                            <li key={'voluntario'}>
                              <input id="voluntario" className={styles.checkbox} required={false} type="radio" name="projectModality" onClick={() => setModality("Voluntário")} />
                              <label
                                htmlFor="voluntario"
                                className={styles.type}>
                                Voluntário
                              </label>
                            </li>
                          </ul>
                        </div>
                      </>
                    )}
                    <div className={styles.projectCategoryContainer}>
                      <label htmlFor="projectCategory">
                        Categoria do projeto
                      </label>
                      {isFetchingCategory && <Loader />}
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
              </Modal>
            </div>
          </div>
        </div>
    </>
  );
};

export default MyProjects;
