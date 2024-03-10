import { ChangeEvent, useContext, useEffect, useState } from "react"
import styles from './styles.module.css'
import api from "../../api/api"
import { AuthContext } from "../../contexts/Auth"
import Button from "../Button"
import { Minus, Plus } from "react-feather"
import Loader from "../Loader"
import toast from "react-hot-toast"
import { ServantProjectIdeasContext, ProjectIdea } from "../../contexts/ServantProjectIdeas"

type Category = {
  name: string
}

type Modality = {
  name: string
}

type EditProjectProps = {
  id?: string
  modalClose: () => void
}

const EditProject: React.FC<EditProjectProps> = ({ id, modalClose }) => {
  const auth = useContext(AuthContext);
  const servantProjectIdeasContext = useContext(ServantProjectIdeasContext)
  const [projectIdea, setProjectIdea] = useState<ProjectIdea | null>(null)
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [modalities, setModalities] = useState<Modality[] | null>(null)

  const [isFetchingCat, setIsFetchingCat] = useState(true)
  const [isFetchingProj, setIsFetchingProj] = useState(true)

  useEffect(() => {
    api.get(`${api.defaults.baseURL}/project-ideas?id=${id}`)
      .then(response => setProjectIdea(response.data))
      .catch(e => console.error(e.message))
      .finally(() => setIsFetchingProj(false))

    api.get(`${api.defaults.baseURL}/categories`)
      .then(response => setCategories(response.data))
      .catch(e => console.error(e.messages))
      .finally(() => setIsFetchingCat(false))

    api.get(`${api.defaults.baseURL}/modalities`)
      .then(response => setModalities(response.data))
      .catch(e => console.error(e.messages))
  }, [])


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [modality, setModality] = useState('');
  const [selectedModalityValue, setSelectedModalityValue] = useState<string | null>()
  const [selectedCategoryValue, setSelectedCategoryValue] = useState<string | null>()

  const [studentsRequired, setStudentsRequired] = useState(1);
  const [category, setCategory] = useState('');
  const [isPublishing, setIsPublishing] = useState(false)

  useEffect(() => {
    if (projectIdea) {
      setTitle(projectIdea.title);
      setDescription(projectIdea.description);
      setStudentsRequired(projectIdea.studentsRequired);
      setSelectedCategoryValue(projectIdea.category.name)
      setSelectedModalityValue(projectIdea.modality.name)
      setCategory(projectIdea.category.name)
      setModality(projectIdea.modality.name)
    }
  }, [projectIdea])


  useEffect(() => {
    if (category === 'MONOGRAFIA') {
      setStudentsRequired(1)
      setModality('VOLUNTÁRIO')
    }
  }, [category])

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

  function handleCategorySelected(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedCategoryValue(e.target.value)
    setCategory(e.target.value)
  }

  function handleModalitySelected(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedModalityValue(e.target.value)
    setModality(e.target.value)
  }


  const updateProject = async (id?: string, e?: any) => {
    e.preventDefault();
    setIsPublishing(true)


    try {
      const response = await api.put(`/project-ideas/${id}`, {
        title,
        description,
        studentsRequired,
        modality,
        category,
        servantId: auth.user?.id
      })


      const newList = servantProjectIdeasContext.servantProjectIdeas?.map(servantProjectIdea => {
        return servantProjectIdea.id === id ? { ...response.data } : servantProjectIdea
      }) as ProjectIdea[]


      servantProjectIdeasContext.setServantProjectIdeas(newList)

      setIsPublishing(false);
      modalClose()
      toast.success('Ideia atulizada com sucesso.')
    } catch (e) {
      toast.error('Erro ao atualizar o projeto.')
      alert("Ocorreu um erro ao atualizar o projeto.");
      setIsPublishing(false);
    }

  }

  return (
    <>
      <h2 className={styles.title}>Editar Projeto</h2>
      <form className={styles.projectForm} onSubmit={(e) => updateProject(id, e)}>
        {isFetchingProj && <Loader />}
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
        {category !== 'MONOGRAFIA' && (
          <div className={styles.numberOfStudentsContainer}>
            <label htmlFor="numberOfStudents">
              Quantidade de alunos
            </label>
            <p style={{ color: '#5a5a5a' }}>Determine a quantidade de alunos</p>
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
            Categoria
          </label>
          <p style={{ color: '#5a5a5a' }}> Selecione a categoria da ideia de projeto</p>
          {isFetchingCat && <Loader />}
          <select name="category" id="category" className={styles.select} value={String(selectedCategoryValue)} onChange={handleCategorySelected}>
            <option value="" >Selecione</option>
            {categories?.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {category !== 'MONOGRAFIA' && (
          <div className={styles.projectCategoryContainer}>
            <label htmlFor="projectModality">
              Modalidade
            </label>
            <p style={{ color: '#5a5a5a' }}> Selecione uma modalidade</p>
            <select name="modality" id="modality" value={String(selectedModalityValue)} onChange={handleModalitySelected} className={styles.select}>
              <option value="">Selecione</option>
              {modalities?.map((modality, index) => (
                <option key={index} value={modality.name}>
                  {modality.name}
                </option>
              ))}
            </select>
          </div>
        )}
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