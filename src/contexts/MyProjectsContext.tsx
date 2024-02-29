import { FC, createContext, useContext, useEffect, useState } from 'react'
import { ProjectPages } from '../types/ProjectPages'
import { MyProjectsContextType } from '../types/ProjectsContext'
import { ProjectsProviderProps } from '../types/ProjectsProvider'
import { useFetch } from '../hooks/useFetch'
import { AuthContext } from "./AuthContext";
import api from '../api/api'
import { Project } from '../types/Project'

export const MyProjectsContext = createContext<MyProjectsContextType>(null!)

const MyProjectsProvider: FC<ProjectsProviderProps> = ({ children }) => {
  const auth = useContext(AuthContext)

  const [myProjects, setMyProjects] = useState<Project[] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  const { data, isFetching } = useFetch<ProjectPages>(`${api.defaults.baseURL}/projects?userid=${auth.user?.id}&skip=${( currentPage - 1 ) * itemsPerPage}`, [currentPage])
  
  useEffect(() => {
    if (data) {
      setMyProjects(prevProjects => prevProjects ? [...prevProjects, ...data?.projectsList!] : data?.projectsList!) 
    }
  }, [data])
  
    
    return (
        <MyProjectsContext.Provider value={ { myProjects, setMyProjects, isFetching, setCurrentPage } }>
            {children}
        </MyProjectsContext.Provider>
    )
}

export default MyProjectsProvider


