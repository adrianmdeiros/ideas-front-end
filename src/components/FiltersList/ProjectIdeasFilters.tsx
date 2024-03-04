import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import api from "../../api/api";
import Loader from "../Loader/Loader";
import styles from './ProjectIdeasFilters.module.css'
import { Category } from "../ProjectForm/ProjectForm";
import { Filter, Search } from "react-feather";
import { useSearchParams } from "react-router-dom";
import { Project } from "../../contexts/MyProjectsContext";

type FiltersFunctions = {
    setData: Dispatch<SetStateAction<Project[] | null>>
    setCurrentPage: Dispatch<SetStateAction<number>>
}

type ProjectIdeasFilters = {
    category: string
    modality: string
}

const ProjectIdeasFilters = (props: FiltersFunctions) => {
    const [categories, setCategories] = useState<Category[] | null>(null)
    const [isFetchingCat, setIsFetchingCat] = useState(true)

    useEffect(() => {
        api.get(`${api.defaults.baseURL}/categories`)
            .then(response => setCategories(response.data))
            .catch(e => console.error(e.messages))
            .finally(() => setIsFetchingCat(false))
    }, [])

    const [_, setSearchParams] = useSearchParams()

    function handleFilterProjectsIdeas(e: any) {
        e.preventDefault()

        props.setCurrentPage(1)
        const { categoryid, modality } = e.target.elements

        setSearchParams(state => {
            categoryid.value !== '' ? state.set('categoryid', categoryid.value) : state.delete('categoryid')
            return state
        })

        setSearchParams(state => {
            modality.value !== '' ? state.set('modality', modality.value) : state.delete('modality')
            return state
        })
        
        props.setData(null)

    }

    const [selectedCategoryValue, setSelectedCategoryValue] = useState<string | null>()
    const [selectedModalityValue, setSelectedModalityValue] = useState<string | null>()

    function handleCategorySelected(e: ChangeEvent<HTMLSelectElement>) {
        setSelectedCategoryValue(e.target.value)
    }

    function handleModalitySelected(e: ChangeEvent<HTMLSelectElement>) {
        setSelectedModalityValue(e.target.value)
    }

    function cleanFilters(e: any) {
        e.preventDefault()

        setSelectedCategoryValue(null)
        setSelectedModalityValue(null)

        setSearchParams(state => {
            state.delete('categoryid')
            state.delete('modality')
            return state
        })

    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleFilterProjectsIdeas} >
                <div>
                    <p className={styles.p} > <Filter size={18} /> Filtrar por categoria</p>
                    <select name="categoryid" className={styles.select} value={String(selectedCategoryValue)} onChange={handleCategorySelected}>
                        <option value={''} selected>Selecione</option>
                        {categories?.map((category) => (
                            <option style={{ color: category.color }} key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                        {isFetchingCat && <Loader color={"#ff7a00"} />}
                    </select>
                </div>
                <div>
                    <p className={styles.p}> <Filter size={18} /> Filtrar por modalidade</p>
                    <select name="modality" className={styles.select} value={String(selectedModalityValue)} onChange={handleModalitySelected}>
                        <option value={''}>Selecione</option>
                        <option value={'bolsista'}>BOLSISTA</option>
                        <option value={'voluntario'}>VOLUNTÁRIO</option>
                    </select>
                </div>
                <button className={styles.button}> <Search size={18} /> Aplicar Filtros </button>
                <button className={styles.cleanFiltersBtn} onClick={cleanFilters} > Limpar Filtros </button>
            </form>
        </div >
    )
}

export default ProjectIdeasFilters