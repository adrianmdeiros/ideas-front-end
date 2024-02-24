export type Project = {
    id: string
    title: string
    description: string
    studentsRequired: number
    modality: string
    amountUsersInterested: number
    category: {
        name: string
        color: string
    }
    user: {
        id: string
        name: string
        course: {
            id: number
            name: string
        }
        email: string
        phone: string
    }
}