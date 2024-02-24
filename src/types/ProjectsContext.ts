import { Dispatch, SetStateAction } from "react"
import { ProjectPages } from "./ProjectPages"

export type ProjectsContextType = {
    projects: ProjectPages | null
    setProjects: Dispatch<SetStateAction<ProjectPages | null>>
    isFetching: boolean
}