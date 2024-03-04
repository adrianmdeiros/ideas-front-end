import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { AuthContext } from "./AuthContext";
import api from '../api/api'

export type Project = {
  id: string
  title: string
  description: string
  studentsRequired: number
  modality: string
  category: {
      id: number
      name: string
      color: string
  }
  user: {
      name: string
      course: {
          id: number
          name: string
      }
      email: string
      phone: string
  }
}

type MyProjectsContextProps = {
  myProjects: Project[] | null
  setMyProjects: Dispatch<SetStateAction<Project[] | null>>
  isFetching: boolean,
  setCurrentPage: Dispatch<SetStateAction<number>>
}

type MyProjectsProviderProps = {
  children: ReactNode
}

export const MyProjectsContext = createContext<MyProjectsContextProps>(null!)

const MyProjectsProvider: FC<MyProjectsProviderProps> = ({ children }) => {
  const auth = useContext(AuthContext)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  const paginate = ( currentPage - 1 ) * itemsPerPage
  const { data: myProjects, setData: setMyProjects, isFetching } = useFetch<Project>(`${api.defaults.baseURL}/projects?userid=${auth.user?.id}&skip=${paginate}`)
  
    
    return (
        <MyProjectsContext.Provider value={ { myProjects, setMyProjects, isFetching, setCurrentPage } }>
            {children}
        </MyProjectsContext.Provider>
    )
}

export default MyProjectsProvider


