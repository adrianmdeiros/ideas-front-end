export type Project = {
    id: string
    title: string
    description: string
    studentsRequired: number
    modality: string
    amountUsersInterested: number
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