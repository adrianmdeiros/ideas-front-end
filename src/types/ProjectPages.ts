import { Project } from "./Project"

export type ProjectPages = {
    totalProjects: number
    totalPages: number
    projectsList: Project[] | null
}