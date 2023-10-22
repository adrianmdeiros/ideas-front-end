import { AlertCircle, Minus, Plus } from "react-feather";
import GlobalStyle from "../../styles/global";
import styles from "./MyProjects.module.css";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { FormEvent, useContext, useState } from "react";
import Menu from "../../components/Menu/Menu";
import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/AuthContext";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import api from "../../api/api";

export type Project = {
  id: string;
  title: string;
  description: string;
  studentsRequired: number;
  user: {
    name: string;
    avatarURL: string;
  };
  category: {
    name: string;
    color: string;
  };
};

type Category = {
  id: number;
  name: string;
  color: string;
};

const MyProjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { data: myProjects, setData: setMyProjects, isFetching } = useFetch<Project[]>(
    `https://api-projif.vercel.app/projects?userId=${user?.id}`
  );

  const { data: categories, isFetching: isFetchingCategory } = useFetch<
    Category[]
  >("https://api-projif.vercel.app/categories");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [studentsRequired, setStudentsRequired] = useState(1);
  const [categoryId, setCategoryId] = useState(0);


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
    const project = {
      title,
      description,
      studentsRequired,
      categoryId,
      userId: user?.id,
    };
    
    const response = await api.post("/projects", project);
    setIsModalOpen(false);
    if(myProjects !== null){
      setMyProjects([...myProjects, response.data]);
    }
  };

  return (
    <>
      <div className={styles.body}>
        <GlobalStyle />
        <Menu />
        <div className={styles.container}>
          <Header padding="0 1rem" backgroundColor="#101010">
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
          <hr />
          <div className={styles.projectsContainer}>
            {!myProjects && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <AlertCircle size={32} />
                <p>Você ainda não criou nenhum projeto...</p>
              </div>
            )}

            {myProjects?.map((projects) => (
              <Post
                id={projects.id}
                key={projects.id}
                title={projects.title}
                description={projects.description}
                numberOfStudents={projects.studentsRequired}
                userName={projects.user.name}
                projectType={projects.category.name}
                avatarUrl={projects.user.avatarURL}
                ccolor={projects.category.color}
              />
            ))}

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
                    <label htmlFor="projectCategory">
                      Categoria do projeto
                    </label>
                    {isFetchingCategory && <Loader />}
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(Number(e.target.value))}
                      className={styles.checkbox}
                    >
                      {categories?.map((category) => (
                        <option value={category.id} className={styles.checkbox}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button
                    backgroundColor="#f5f5f5"
                    borderRadius=".5rem"
                    color="#101010"
                    hover="#dedede"
                    width="100%"
                  >
                    Publicar
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
