import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState } from "react";
import { Minus, Plus } from "react-feather";
import { AuthContext } from "../../contexts/Auth";
import { ServantProjectIdeasContext } from "../../contexts/ServantProjectIdeas";
import api from "../../api/api";
import toast from "react-hot-toast";
import Loader from "../Loader";
import Button from "../Button";
import styles from './styles.module.css'

type ProjectFormModalBehavior = {
    isModalOpen: boolean
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

type Modality = {
    name: string
}


type Category = {
    name: string;
};

const ProjectForm = (props: ProjectFormModalBehavior) => {
    const auth = useContext(AuthContext);
    const servantProjectIdeasContext = useContext(ServantProjectIdeasContext)
    const [modalities, setModalities] = useState<Modality[] | null>(null)
    const [categories, setCategories] = useState<Category[] | null>(null)
    const [isFetchingCat, setIsFetchingCat] = useState(true)

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [studentsRequired, setStudentsRequired] = useState(1);
    const [modality, setModality] = useState('');
    const [category, setCategory] = useState('');
    const [isPublishing, setIsPublishing] = useState<Boolean>(false)
    const [selectedModalityValue, setSelectedModalityValue] = useState<string | null>()
    const [selectedCategoryValue, setSelectedCategoryValue] = useState<string | null>()

    useEffect(() => {
        api.get(`${api.defaults.baseURL}/categories`)
            .then(response => setCategories(response.data))
            .catch(e => console.error(e.messages))
            .finally(() => setIsFetchingCat(false))
        api.get(`${api.defaults.baseURL}/modalities`)
            .then(response => setModalities(response.data))
            .catch(e => console.error(e.messages))
    }, [])


    useEffect(() => {
        if (category === 'MONOGRAFIA') {
            setStudentsRequired(1)
            setModality('VOLUNTÁRIO')
        }
        if(category === 'PIVIC'){
            setModality('VOLUNTÁRIO')
          }
    }, [category])


    const addStudent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (studentsRequired < 5) {
            setStudentsRequired(studentsRequired + 1);
        }
    };

    const removeStudent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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


    const createProject = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPublishing(true)

        try {
            const response = await api.post("/project-ideas", {
                title,
                description,
                studentsRequired,
                modality,
                category,
                servantId: auth.user?.id
            });


            toast.success('Ideia de projeto criada!')

            setIsPublishing(false);
            props.setIsModalOpen(false)

            servantProjectIdeasContext.setServantProjectIdeas(
                servantProjectIdeasContext.servantProjectIdeas ? [...servantProjectIdeasContext.servantProjectIdeas, response.data] : [response.data]
            );

        } catch (e) {
            toast.error("Verifique se todos os campos foram preenchidos. Lembrete: Não pode haver dois projetos com o mesmo título.");
            setIsPublishing(false);
        }
        setSelectedCategoryValue(null)
        setSelectedModalityValue(null)
        setCategory('')
        setModality('')
    };

    return (
        <>
            <h2 className={styles.title}>Adicionar Ideia de Projeto</h2>
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
                                width="32%"
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
                                width="32%"
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
                {category !== 'MONOGRAFIA' && category !== 'PIVIC' && (
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
                    disabled={isPublishing ? true : false}
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