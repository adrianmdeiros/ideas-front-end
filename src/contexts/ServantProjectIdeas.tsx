import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext } from 'react'
import { useFetch } from '../hooks/useFetch'
import { AuthContext } from "./Auth";
import api from '../api/api'

export type ProjectIdea = {
  id: string
  title: string
  description: string
  studentsRequired: number
  modality: {
    name: string
  }
  category: {
    name: string
  }
  servant: {
    department: {
      name: string
    }
    user: {
      name: string
      email: string
      phone: string
    }
  }
}

type ServantProjectsContextProps = {
  servantProjectIdeas: ProjectIdea[] | null
  setServantProjectIdeas: Dispatch<SetStateAction<ProjectIdea[] | null>>
  isFetching: boolean
}

type ServantProjectIdeasProviderProps = {
  children: ReactNode
}

export const ServantProjectIdeasContext = createContext<ServantProjectsContextProps>(null!)

const ServantProjectIdeasProvider: FC<ServantProjectIdeasProviderProps> = ({ children }) => {
  const auth = useContext(AuthContext)

  const { data: servantProjectIdeas, setData: setServantProjectIdeas, isFetching } = useFetch<ProjectIdea[] | null>(`${api.defaults.baseURL}/project-ideas?servantId=${123}`) // trocar para id do usuário autenticado

  return (
    <ServantProjectIdeasContext.Provider value={{ servantProjectIdeas, setServantProjectIdeas, isFetching }}>
      {children}
    </ServantProjectIdeasContext.Provider>
  )
}

export default ServantProjectIdeasProvider


