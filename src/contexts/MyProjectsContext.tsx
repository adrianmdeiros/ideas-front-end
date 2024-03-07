import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react'
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
  myProjectIdeas: Project[] | null
  setMyProjectIdeas: Dispatch<SetStateAction<Project[] | null>>
  setCurrentPage: Dispatch<SetStateAction<number>>
  isFetching: boolean
}

type MyProjectsProviderProps = {
  children: ReactNode
}

export const MyProjectsContext = createContext<MyProjectsContextProps>(null!)

const MyProjectsProvider: FC<MyProjectsProviderProps> = ({ children }) => {
  const auth = useContext(AuthContext)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  const paginate = (currentPage - 1) * itemsPerPage

  const [myProjectIdeas, setMyProjectIdeas] = useState<Project[] | null>(null)
  const { data: myProjects,  isFetching } = useFetch<Project>(`${api.defaults.baseURL}/projects?userid=${auth.user?.id}&skip=${paginate}`)

  useEffect(() => {
    if (myProjects) {
      myProjectIdeas ? setMyProjectIdeas([...myProjectIdeas, ...myProjects]) : setMyProjectIdeas(myProjects)
    }
  }, [myProjects])


  return (
    <MyProjectsContext.Provider value={{ myProjectIdeas, setMyProjectIdeas, isFetching, setCurrentPage }}>
      {children}
    </MyProjectsContext.Provider>
  )
}

export default MyProjectsProvider


