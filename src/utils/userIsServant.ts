import { useContext } from "react"
import { AuthContext } from "../contexts/Auth"

export function userIsServant() {
    const auth = useContext(AuthContext)
    return auth.user?.tipo_vinculo === 'Servidor'
}

export function normalizeUrlSearchParam(param: any){
  return param.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}