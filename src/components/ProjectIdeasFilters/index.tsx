import { ChangeEvent, FormEvent, useState } from "react";
import styles from './styles.module.css'
import { Filter, Search } from "react-feather";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import api from "../../api/api";
import Button from "../Button";
import { normalizeUrlSearchParam } from "../../utils/userIsServant";

type Category = {
    name: string
}
type Modality = {
    name: string
}

type Department = {
    name: string
}

const ProjectIdeasFilters = () => {

    const { data: categories } = useFetch<Category[] | null>(`${api.defaults.baseURL}/categories`)
    const { data: modalities } = useFetch<Modality[] | null>(`${api.defaults.baseURL}/modalities`)
    const { data: departments } = useFetch<Department[] | null>(`${api.defaults.baseURL}/departments`)

    const [selectedCategoryValue, setSelectedCategoryValue] = useState<string | null>()
    const [selectedModalityValue, setSelectedModalityValue] = useState<string | null>()
    const [selectedDepartmentValue, setSelectedDepartmentValue] = useState<string | null>()
    const [_, setSearchParams] = useSearchParams()

    function handleCategorySelected(e: ChangeEvent<HTMLSelectElement>) {
        setSelectedCategoryValue(e.target.value)
    }

    function handleModalitySelected(e: ChangeEvent<HTMLSelectElement>) {
        setSelectedModalityValue(e.target.value)
    }

    function handleDepartmentSelected(e: ChangeEvent<HTMLSelectElement>) {
        setSelectedDepartmentValue(e.target.value)
    }

    function handleFilterProjectsIdeas(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const filterForm = e.target as HTMLFormElement
        const { category, modality, department } = filterForm.elements as any

        setSearchParams(state => {
            if (category.value !== '')
                state.set('category', category.value.toLowerCase())
            else
                state.delete('category')
            return state
        })

        setSearchParams((state) => {
            if (modality.value !== ''){
                const normalizedModalityValue = normalizeUrlSearchParam(modality.value)
                state.set('modality', normalizedModalityValue.toLowerCase())
            }   else{
                state.delete('modality')
            }
            return state
        })

        setSearchParams(state => {
            if (department.value !== '')
                state.set('department', department.value.toLowerCase())
            else
                state.delete('department')
            return state
        })
    }

    async function cleanFilters(e: any) {
        e.preventDefault()

        setSelectedCategoryValue(null)
        setSelectedModalityValue(null)
        setSelectedDepartmentValue(null)

        setSearchParams(state => {
            state.delete('category')
            state.delete('modality')
            state.delete('department')
            return state
        })

    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleFilterProjectsIdeas} >
                <div>
                    <label className={styles.p}> <Filter size={18} />Departamento</label>
                    <select name="department" className={styles.select} value={String(selectedDepartmentValue)} onChange={handleDepartmentSelected}>
                        <option value={''}>Selecione</option>
                        {departments?.map((department, index) => (
                            <option key={index} value={department.name}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className={styles.p} > <Filter size={18} />Categoria</label>
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
                    <label className={styles.p}> <Filter size={18} />Modalidade</label>
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
                    <Button terciary gap>
                        <Search size={18} />
                        Aplicar Filtros
                    </Button>
                    <Button transparent link onClick={cleanFilters}>
                        Limpar Filtros
                    </Button>
                </div>
            </form>
        </div >
    )
}

export default ProjectIdeasFilters