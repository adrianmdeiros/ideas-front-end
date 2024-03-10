import { useContext } from "react"
import { AuthContext } from "../contexts/Auth"

export function userIsServant() {
    const auth = useContext(AuthContext)
    return auth.user?.tipo_vinculo === 'Aluno'
  }