import { useEffect, useState } from "react"
import api from "../api/api"

export function useFetch<T = unknown>(url: string, dependencies?: any ) {
    const [data, setData] = useState<T | null>(null)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    
    useEffect(() => {
        api.get(url)
            .then(response => {
                setData(response.data)
            })
            .catch(err => {
                setError(err)
            })
            .finally(() => {
                setIsFetching(false)
            })
    }, [dependencies])


    return { data, setData, isFetching, error }

}