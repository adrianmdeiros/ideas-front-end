import { Dispatch, SetStateAction } from "react"
import { Project } from "./Project"

export type MyProjectsContextType = {
    myProjects: Project[] | null
    setMyProjects: Dispatch<SetStateAction<Project[] | null>>
    isFetching: boolean,
    setCurrentPage: Dispatch<SetStateAction<number>>
}