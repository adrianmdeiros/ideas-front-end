import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import api from "../../api/api";
import styles from './ProjectIdeasFilters.module.css'
import { Category } from "../ProjectForm/ProjectForm";
import { Filter, Search } from "react-feather";
import { useSearchParams } from "react-router-dom";
import { Project } from "../../contexts/MyProjectsContext";

type FiltersFunctions = {
    changeMainProjectIdeas: Dispatch<SetStateAction<Project[] | null>>
    setCurrentPage: Dispatch<SetStateAction<number>>
}

type ProjectIdeasFilters = {
    category: string
    modality: string
}

const ProjectIdeasFilters = (props: FiltersFunctions) => {
    const [categories, setCategories] = useState<Category[] | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        api.get(`${api.defaults.baseURL}/categories`)
            .then(response => setCategories(response.data))
            .catch(e => console.error(e.messages))
    }, [])


    function handleFilterProjectsIdeas(e: any) {
        e.preventDefault()

        
        const { categoryid, modality } = e.target.elements
        
        if(categoryid.value !== '' || modality.value !== ''){
            props.changeMainProjectIdeas(null)
            props.setCurrentPage(1)
        }

        setSearchParams(state => {
            categoryid.value !== '' ? state.set('categoryid', categoryid.value) : state.delete('categoryid')
            return state
        })

        setSearchParams(state => {
            modality.value !== '' ? state.set('modality', modality.value) : state.delete('modality')
            return state
        })


    }

    const [selectedCategoryValue, setSelectedCategoryValue] = useState<string | null>()
    const [selectedModalityValue, setSelectedModalityValue] = useState<string | null>()

    function handleCategorySelected(e: ChangeEvent<HTMLSelectElement>) {
        setSelectedCategoryValue(e.target.value)
    }

    function handleModalitySelected(e: ChangeEvent<HTMLSelectElement>) {
        setSelectedModalityValue(e.target.value)
    }

    async function cleanFilters(e: any) {
        e.preventDefault()

        setSelectedCategoryValue(null)
        setSelectedModalityValue(null)

        setSearchParams(state => {
            state.delete('categoryid')
            state.delete('modality')
            return state
        })

        props.setCurrentPage(1)
        props.changeMainProjectIdeas(null)


    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleFilterProjectsIdeas} >
                <div>
                    <label className={styles.p} > <Filter size={18} /> Filtrar por categoria</label>
                    <select name="categoryid" className={styles.select} value={String(selectedCategoryValue)} onChange={handleCategorySelected}>
                        <option value={''} >Selecione</option>
                        {categories?.map((category) => (
                            <option style={{ color: category.color }} key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className={styles.p}> <Filter size={18} /> Filtrar por modalidade</label>
                    <select name="modality" className={styles.select} value={String(selectedModalityValue)} onChange={handleModalitySelected}>
                        <option value={''}>Selecione</option>
                        <option value={'bolsa'}>BOLSA</option>
                        <option value={'voluntario'}>VOLUNTÁRIO</option>
                    </select>
                </div>
                <div className={styles.buttonsContainer}>
                    <button className={styles.button} > <Search size={18} /> Aplicar Filtros </button>
                    {searchParams.get('categoryid') || searchParams.get('modality') ? 
                        <button className={styles.cleanFiltersBtn} onClick={cleanFilters} >
                            Limpar Filtros
                        </button>
                        :
                        ''
                    }
                </div>
            </form>
        </div >
    )
}

export default ProjectIdeasFilters