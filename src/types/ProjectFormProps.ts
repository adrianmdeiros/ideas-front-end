import { Dispatch, SetStateAction } from "react"

export type ProjectFormProps = {
    isModalOpen: boolean
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}
