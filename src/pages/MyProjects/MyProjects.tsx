import { AlertCircle, Minus, Plus, PlusCircle } from "react-feather";
import GlobalStyle from "../../styles/global";
import styles from "./MyProjects.module.css";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { FormEvent, useContext, useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../api/api";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import toast from "react-hot-toast/headless";

export type Project = {
  id: string;
  title: string;
  description: string;
  studentsRequired: number;
  modality: string;
  amountUsersInterested: number;
  user: {
    id: number
    name: string;
    // avatarURL: string;
    course: {
      id: number
      name: string
    };
  };
  category: {
    id: number
    name: string;
    color: string
  };
};

type Category = {
  id: number;
  name: string;
  color: string;
};

const MyProjects = () => {
  const auth = useContext(AuthContext);
  const {
    data: myProjects,
    setData: setMyProjects,
    isFetching,
  } = useFetch<Project[]>(
    `https://api-projif.vercel.app/projects?userid=${auth.user?.id}`);

  const { data: categories, isFetching: isFetchingCategory } = useFetch<
    Category[]
  >("https://api-projif.vercel.app/categories")

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExcluding, setIsExcluding] = useState(false)

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

      setMyProjects(myProjects ? [...myProjects, response.data] : [response.data]);
    } catch (e) {
      toast.error(":( Ocorreu um erro! Talvez o projeto já exista... Tente um título diferente :)!");
      alert('Ocorreu algum erro, tente novamente.')
      setIsPublishing(false);
    }
    setCategoryId(0)
    setModality('')
  };

  const deleteProject = async (id: string, e: any) => {
    e.preventDefault();
    setIsExcluding(true)

    await api.delete(`/projects/${id}`);

    setIsExcluding(false);
    setIsModalOpen(false)
    toast.success('Ideia de projeto removida.')

    if (myProjects !== null) {
      const newProjectsList = myProjects.filter((project) => {
        return project.id !== id;
      });

      newProjectsList.length === 0 ? setMyProjects(null) : setMyProjects(newProjectsList);
    }
  };


  return (
    <>
      <div className={styles.body}>
        <GlobalStyle />
        <Menu />
        <div className={styles.container}>
          <header style={{ display: 'flex', alignItems:'center', justifyContent:'space-between  ', backgroundColor:"#101010"}} >
            <h1>Meus Projetos</h1>
            <Button
              backgroundColor="#ff7a00"
              borderRadius="9rem"
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
              {myProjects?.map((project) => (
                <li key={project.id}>
                  <Post
                    id={project.id}
                    userId={auth.user?.id}
                    title={project.title}
                    description={project.description}
                    studentsRequired={project.studentsRequired}
                    modality={project.modality}
                    amountUsersInterested={project.amountUsersInterested}
                    userName={project.user.name}
                    projectCategory={project.category.name}
                    // avatarUrl={project.user.avatarURL}
                    ccolor={project.category.color}
                    deleteProject={(e: any) => deleteProject(project.id, e)}
                    isExcluding={isExcluding}
                    userCourse={project.user.course.name}
                    myProjects={myProjects}
                    setMyProjects={setMyProjects}
                  />
                </li>
              ))}
            </ul>
            {!myProjects && !isFetching && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <AlertCircle size={32} />
                <p>Você ainda não adicionou nenhuma ideia de projeto.</p>
              </div>
            )}
            {isFetching && <Loader color={"#ff7a00"} />}
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
                            <input id="bolsista" className={styles.checkbox} required={true} type="radio" name="projectModality" onClick={() => setModality("Bolsista")} />
                            <label
                              htmlFor="bolsista"
                              className={styles.type}>
                              Bolsista
                            </label>
                          </li>
                          <li key={'voluntario'}>
                            <input id="voluntario" className={styles.checkbox} required={true} type="radio" name="projectModality" onClick={() => setModality("Voluntário")} />
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
