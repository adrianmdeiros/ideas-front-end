export type FiltersListProps = {
    getProjects: () => void
    getProjectsByUserCourseAndCategory: (usercourseid: number, categoryid: number) => void
}