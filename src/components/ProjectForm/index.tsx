import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { Info, Minus, Plus } from "react-feather";
import { AuthContext } from "../../contexts/Auth";
import api from "../../api/api";
import toast from "react-hot-toast";
import Loader from "../Loader";
import Button from "../Button";
import styles from './styles.module.css'

import { useFetch } from "../../hooks/useFetch";
import { ProjectIdea, ServantProjectIdeasContext } from "../../contexts/ServantProjectIdeas";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../Modal";


type ProjectFormProps = {
    id?: string
    isModalOpen: boolean
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

type Category = {
    name: string
}
type Modality = {
    name: string
}

type FormData = {
    title: string
    description: string
    studentsRequired: number
    modality: string
    category: string
}


const ProjectForm: React.FC<ProjectFormProps> = (props: ProjectFormProps) => {
    const auth = useContext(AuthContext);
    const servantProjectIdeasContext = useContext(ServantProjectIdeasContext)

    const { data: categories } = useFetch<Category[] | null>(`${api.defaults.baseURL}/categories`)
    const { data: modalities } = useFetch<Modality[] | null>(`${api.defaults.baseURL}/modalities`)

    const { register,
        handleSubmit,
        formState: { isSubmitting, errors },
        watch,
        setValue,
        getValues,
        reset
    } = useForm<FormData>({
        defaultValues: async () => {
            const response = await api.get(`${api.defaults.baseURL}/project-ideas?id=${props.id}`)            
            return {
                title: response?.data.title,
                description: response?.data.description,
                studentsRequired: response?.data.studentsRequired,
                modality: response?.data.modality.name,
                category: response?.data.category.name
            } as FormData
        }
    })
    const studentsRequired = watch('studentsRequired', 1)
    const category = watch('category')

    useEffect(() => {
        if (category === 'MONOGRAFIA') {
            setValue('studentsRequired', 1)
            setValue('modality', 'VOLUNTÁRIO')
        }
        if (category === 'PIVIC' || category === 'PIVITI') {
            setValue('modality', 'VOLUNTÁRIO')
        }
    }, [category])


    const addStudent = (e: any) => {
        e.preventDefault()
        const actualValue = Number(getValues('studentsRequired'))
        if (actualValue < 5) {
            setValue('studentsRequired', actualValue + 1)
        }
    };

    const removeStudent = (e: any) => {
        e.preventDefault()
        const actualValue = Number(getValues('studentsRequired'))
        if (actualValue > 1) {
            setValue('studentsRequired', actualValue - 1)
        }
    };

    const createProjectIdea: SubmitHandler<FormData> = async (data: FormData) => {
        try {
            const response = await api.post('/project-ideas', {
                ...data,
                servantId: auth.user?.id
            })
            servantProjectIdeasContext.setServantProjectIdeas(
                servantProjectIdeasContext.servantProjectIdeas ?
                    [...servantProjectIdeasContext.servantProjectIdeas, response.data] : [response.data]
            );
            props.setIsModalOpen(false)
            toast.success('Ideia adicionada com sucesso!')
            
            reset()
        } catch (error) {
            toast.error('Desculpe, ocorreu um erro.')
            toast.error('Verifique se todos os campos foram preenchidos.')
            toast.error('Talvez já exista algum projeto com esse título.')
            console.error(error)
        }

    }

    const updateProject: SubmitHandler<FormData> = async (data: FormData) => {
        try {
                const response = await api.put(`/project-ideas/${props.id}`, {
                    ...data,
                    servantId: auth.user?.id
                })
            
                
                const newList = servantProjectIdeasContext.servantProjectIdeas?.map(servantProjectIdea => {
                    return servantProjectIdea.id === props.id ? { ...response.data } : servantProjectIdea
                }) as ProjectIdea[]
                servantProjectIdeasContext.setServantProjectIdeas(newList)
                
                props.setIsModalOpen(false)
            toast.success('Ideia de projeto atulizada com sucesso!')
            reset()
        } catch (error) {
            toast.error('Desculpe, ocorreu um erro.')
            toast.error('Verifique se todos os campos foram preenchidos.')
            toast.error('Talvez já exista algum projeto com esse título.')
            console.error(error)
        }
    
    }

    return (
        <>
            <Modal isOpen={props.isModalOpen} setOpenModal={() => props.setIsModalOpen(!props.isModalOpen)}>
                <h2 className={styles.title}>
                    {props.id ? 'Editar ideia de projeto' : 'Adicionar ideia de projeto'}
                </h2>
                <form
                    className={styles.projectForm}
                    onSubmit={
                        props.id ? handleSubmit(updateProject) : handleSubmit(createProjectIdea)
                    }
                >
                    <div className={styles.projectTitleContainer}>
                        <label>Titulo</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Digite o título da sua ideia..."
                            {...register('title', { required: true, minLength: 10, maxLength: 150 })}
                            aria-invalid={errors.title ? 'true' : 'false'}
                        />
                        {errors.title?.type === 'required' &&
                            <p className={styles.fieldErrorMessage}>
                                <Info size={16} /> Este campo precisa ser preenchido.
                            </p>
                        }
                        {errors.title?.type === 'minLength' &&
                            <p className={styles.fieldErrorMessage}>
                                <Info size={16} /> O título deve ter no mínimo 10 caracteres.
                            </p>
                        }
                        {errors.title?.type === 'maxLength' &&
                            <p className={styles.fieldErrorMessage}>
                                <Info size={16} /> O título deve ter no máximo 150 caracteres.
                            </p>
                        }
                    </div>
                    <div className={styles.description}>
                        <label htmlFor="descriptionContainer">Descrição</label>
                        <textarea
                            className={styles.descriptionText}
                            placeholder="Adicione uma breve descrição..."
                            {...register('description', { required: true, minLength: 20, maxLength: 500 })}
                            aria-invalid={errors.description ? 'true' : 'false'}
                        />
                        {errors.description?.type === 'required' &&
                            <p className={styles.fieldErrorMessage}>
                                <Info size={16} /> Este campo precisa ser preenchido.
                            </p>
                        }
                        {errors.description?.type === 'minLength' &&
                            <p className={styles.fieldErrorMessage}>
                                <Info size={16} /> A descrição precisa ter no mínimo 20 caracteres.
                            </p>
                        }
                        {errors.description?.type === 'maxLength' &&
                            <p className={styles.fieldErrorMessage}>
                                <Info size={16} /> A descrição precisa ter no máximo 500 caracteres.
                            </p>
                        }
                    </div>
                    {category !== 'MONOGRAFIA' && (
                        <div className={styles.numberOfStudentsContainer}>
                            <label htmlFor="numberOfStudents">
                                Quantidade de alunos
                            </label>
                            <p style={{ color: '#5a5a5a' }}>Determine a quantidade de alunos</p>
                            <div className={styles.addOrRemoveStudentsContainer}>
                                <Button
                                    terciary
                                    onClick={removeStudent}
                                >
                                    <Minus />
                                </Button>
                                <input
                                    type="number"
                                    className={styles.numberOfStudents}
                                    {...register('studentsRequired', { min: 1, max: 5, value: studentsRequired })}
                                    disabled
                                />
                                <Button
                                    terciary
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
                        <select className={styles.select}
                            {...register('category', { required: true, value: category })}
                            aria-invalid={errors.category ? 'true' : 'false'}
                        >
                            <option value="">Selecione</option>
                            {categories?.map((category, index) => (
                                <option value={category.name} key={index}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category?.type === 'required' &&
                            <p className={styles.fieldErrorMessage}>
                                <Info size={16} /> Este campo precisa ser selecionado.
                            </p>
                        }
                    </div>
                    {category !== 'MONOGRAFIA' && category !== 'PIVIC' && category !== 'PIVITI' && (
                        <div className={styles.projectCategoryContainer}>
                            <label htmlFor="projectModality">
                                Modalidade
                            </label>
                            <p style={{ color: '#5a5a5a' }}> Selecione uma modalidade</p>
                            <select className={styles.select}
                                {...register('modality', { required: true })}
                                aria-invalid={errors.modality ? 'true' : 'false'}
                            >
                                <option value="">Selecione</option>
                                {modalities?.map((modality, index) => (
                                    <option key={index} value={modality.name}>
                                        {modality.name}
                                    </option>
                                ))}
                            </select>
                            {errors.modality?.type === 'required' &&
                                <p className={styles.fieldErrorMessage}>
                                    <Info size={16} /> Este campo precisa ser selecionado.
                                </p>
                            }
                        </div>
                    )}
                    <Button
                        type="submit"
                        terciary
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader />
                            </>
                        ) : (
                            <p> {props.id ? 'Salvar' : 'Publicar'}</p>
                        )}
                    </Button>
                </form>
            </Modal>
        </>
    )
}

export default ProjectForm