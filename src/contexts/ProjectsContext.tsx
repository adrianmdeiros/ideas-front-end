import { FC, createContext, useContext } from 'react'
import { ProjectPages } from '../types/ProjectPages'
import { ProjectsContextType } from '../types/ProjectsContext'
import { ProjectsProviderProps } from '../types/ProjectsProvider'
import { useFetch } from '../hooks/useFetch'
import { AuthContext } from "./AuthContext";
import api from '../api/api'

export const ProjectsContext = createContext<ProjectsContextType>(null!)

const ProjectsProvider: FC<ProjectsProviderProps> = ({ children }) => {
    const auth = useContext(AuthContext)
    
    const { data: projects, setData: setProjects, isFetching } = useFetch<ProjectPages>(`${api.defaults.baseURL}/projects?userid=${auth.user?.id}`)

    
    return (
        <ProjectsContext.Provider value={ { projects, setProjects, isFetching } }>
            {children}
        </ProjectsContext.Provider>
    )
}

export default ProjectsProvider


