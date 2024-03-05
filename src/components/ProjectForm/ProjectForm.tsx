import { Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState } from "react";
import { Minus, Plus } from "react-feather";
import { AuthContext } from "../../contexts/AuthContext";
import { MyProjectsContext } from "../../contexts/MyProjectsContext";
import api from "../../api/api";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import styles from './ProjectForm.module.css'

type ProjectFormModalBehavior = {
    isModalOpen: boolean
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export type Category = {
    id: number;
    name: string;
    color: string;
};

const ProjectForm = (props: ProjectFormModalBehavior) => {
    const auth = useContext(AuthContext);
    const myProjectsContext = useContext(MyProjectsContext)
    const [categories, setCategories] = useState<Category[] | null>(null)
    const [isFetchingCat, setIsFetchingCat] = useState(true)

    useEffect(() => {
        api.get(`${api.defaults.baseURL}/categories`)
            .then(response => setCategories(response.data))
            .catch(e => console.error(e.messages))
            .finally(() => setIsFetchingCat(false))
    }, [])

    const [title, setTitle] = useState<String>('');
    const [description, setDescription] = useState<String>('');
    const [modality, setModality] = useState<String>('');
    const [studentsRequired, setStudentsRequired] = useState(1);

    const [categoryId, setCategoryId] = useState<Number>(0);
    const [isPublishing, setIsPublishing] = useState<Boolean>(false)

    useEffect(() => {
        if (categoryId === 6) {
            setStudentsRequired(1)
            setModality('')
        }
    }, [categoryId])

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

            console.log(response.data);
            
            toast.success('Ideia de projeto criada!')

            setIsPublishing(false);
            props.setIsModalOpen(false)

            myProjectsContext.setMyProjectIdeas(
                myProjectsContext.myProjectIdeas ? [...myProjectsContext.myProjectIdeas, response.data] : response.data
            );

        } catch (e) {
            toast.error("Ocorreu um erro. Talvez já exista uma ideia de projeto com esse título.");
            setIsPublishing(false);
        }
        setCategoryId(0)
        setModality('')
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
                    {isFetchingCat && <Loader />}
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