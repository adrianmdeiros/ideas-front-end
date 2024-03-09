import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { AuthContext } from "./Auth";
import api from '../api/api'

export type ProjectIdea = {
  id: string
  title: string
  description: string
  studentsRequired: number
  modality: string
  category: string
  servant: {
    user: {
      name: string
      email: string
      phone: string
    }
    department: string
  }
}

type ServantProjectsContextProps = {
  servantProjectIdeas: ProjectIdea[] | null
  setServantProjectIdeas: Dispatch<SetStateAction<ProjectIdea[] | null>>
  setCurrentPage: Dispatch<SetStateAction<number>>
  isFetching: boolean
}

type ServantProjectIdeasProviderProps = {
  children: ReactNode
}

export const ServantProjectIdeasContext = createContext<ServantProjectsContextProps>(null!)

const ServantProjectIdeasProvider: FC<ServantProjectIdeasProviderProps> = ({ children }) => {
  const auth = useContext(AuthContext)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  const paginate = (currentPage - 1) * itemsPerPage

  const [servantProjectIdeas, setServantProjectIdeas] = useState<ProjectIdea[] | null>(null)
  const { data: servantProjects,  isFetching } = useFetch<ProjectIdea>(`${api.defaults.baseURL}/projects?userid=${auth.user?.id}&skip=${paginate}`)

  useEffect(() => {
    if (servantProjects) {
      servantProjectIdeas ? setServantProjectIdeas([...servantProjectIdeas, ...servantProjects]) : setServantProjectIdeas(servantProjects)
    }
  }, [servantProjects])


  return (
    <ServantProjectIdeasContext.Provider value={{ servantProjectIdeas, setServantProjectIdeas, isFetching, setCurrentPage }}>
      {children}
    </ServantProjectIdeasContext.Provider>
  )
}

export default ServantProjectIdeasProvider


