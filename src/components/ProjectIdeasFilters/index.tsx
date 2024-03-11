import { ChangeEvent, useEffect, useState } from "react";
import api from "../../api/api";
import styles from './styles.module.css'
import { Filter, Search } from "react-feather";
import { useSearchParams } from "react-router-dom";


type ProjectIdeasFilters = {
    category: string
    modality: string
}

type Modality = {
    name: string
}

type Category = {
    name: string
}

const ProjectIdeasFilters = () => {
    const [categories, setCategories] = useState<Category[] | null>(null)
    const [modalities, setModalities] = useState<Modality[] | null>(null)
    const [selectedCategoryValue, setSelectedCategoryValue] = useState<string | null>()
    const [selectedModalityValue, setSelectedModalityValue] = useState<string | null>()
    const [_, setSearchParams] = useSearchParams()

    useEffect(() => {
        api.get(`${api.defaults.baseURL}/categories`)
            .then(response => setCategories(response.data))
            .catch(e => console.error(e.messages))

        api.get(`${api.defaults.baseURL}/modalities`)
            .then(response => setModalities(response.data))
            .catch(e => console.error(e.messages))
    }, [])


    function handleFilterProjectsIdeas(e: any) {
        e.preventDefault()

        const { category, modality } = e.target.elements

        setSearchParams(state => {
            if (category.value !== '')
                state.set('category', category.value.toLowerCase())
            else
                state.delete('category')
            return state
        })

        setSearchParams(state => {
            if (modality.value !== '')
                state.set('modality', modality.value.toLowerCase())
            else
                state.delete('modality')
            return state
        })

    }

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
            state.delete('category')
            state.delete('modality')
            return state
        })

    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleFilterProjectsIdeas} >
                <div>
                    <label className={styles.p} > <Filter size={18} /> Filtrar por categoria</label>
                    <select name="category" className={styles.select} value={String(selectedCategoryValue)} onChange={handleCategorySelected}>
                        <option value={''}>Selecione</option>
                        {categories?.map((category, index) => (
                            <option key={index} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className={styles.p}> <Filter size={18} /> Filtrar por modalidade</label>
                    <select name="modality" className={styles.select} value={String(selectedModalityValue)} onChange={handleModalitySelected}>
                        <option value={''}>Selecione</option>
                        {modalities?.map((modality, index) => (
                            <option key={index} value={modality.name}>
                                {modality.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.buttonsContainer}>
                    <button className={styles.button} > <Search size={18} /> Aplicar Filtros </button>
                    <button className={styles.cleanFiltersBtn} onClick={cleanFilters}>Limpar Filtros </button>
                </div>
            </form>
        </div >
    )
}

export default ProjectIdeasFilters