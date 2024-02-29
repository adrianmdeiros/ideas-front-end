export type FiltersListProps = {
    filterAll: () => void
    filterByUserCourseAndCategory: (usercourseid: number, categoryid: number) => void
}