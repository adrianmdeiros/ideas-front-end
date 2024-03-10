import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/Auth"
import api from "../../api/api"

type dbUser = {
    name: string
    email: string
    phone: string
    bond: string
}

export const getDbUser = () => {
    const auth = useContext(AuthContext)
    const [user, setUser] = useState<dbUser | null>(null)

    useEffect(() => {
        getDbUser()
    }, [])

    const getDbUser = async () => {
        await api.get(`${api.defaults.baseURL}/users?id=${auth.user?.id}`)
            .then(response => setUser(response.data))
            .catch(e => console.error(e))
    }

    return { user }
} 