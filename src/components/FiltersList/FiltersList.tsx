import { useContext, useState } from "react";
import api from "../../api/api";
import { useFetch } from "../../hooks/useFetch";
import { Category } from "../../types/Category";
import { dbUser } from "../../types/dbUser";
import Loader from "../Loader/Loader";
import Tag from "../Tag/Tag";
import styles from './FiltersList.module.css'
import { AuthContext } from "../../contexts/AuthContext";
import { FiltersListProps } from "../../types/FiltersListProps";


const FiltersList = (props: FiltersListProps) => {
    const auth = useContext(AuthContext)

    const { data: user } = useFetch<dbUser>(`${api.defaults.baseURL}/users/${auth.user?.id}`)

    const { data: categories, isFetching: isFetchingCategories } = useFetch<Category[]>(
        `${api.defaults.baseURL}/categories`
    );

    const [activeFilter, setActiveFilter] = useState<Number>()

    return (
        <div>
            {isFetchingCategories && <Loader color={"#ff7a00"} />}
            <ul className={styles.tagsContainer}>
                <li>
                    <Tag
                        active={activeFilter === undefined ? 'active' : ''}
                        onClick={() => {
                            props.getProjects()
                            setActiveFilter(undefined)
                        }}
                        color="crimson">
                        TODOS
                    </Tag>
                </li>
                {categories?.map((category, index) => (
                    <li key={category.id}>
                        <Tag
                            active={activeFilter === index ? 'active' : ''}
                            color={category.color}
                            onClick={() => {
                                setActiveFilter(index)
                                if (user) {
                                    props.getProjectsByUserCourseAndCategory(user?.courseId, category.id)
                                }
                            }}>
                            {category.name}
                        </Tag>
                    </li>
                ))}
            </ul>
        </div >
    )
}

export default FiltersList