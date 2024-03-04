import { useEffect, useState } from "react"
import api from "../api/api"

export function useFetch<T = unknown>(url: string, queryParams?: URLSearchParams | null, dependencies: any[] = []) {
    const [data, setData] = useState<T[] | null>(null)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fullUrl = `${url}${queryParams ? '&' + queryParams.toString()  : ''}`
        api.get(fullUrl)
            .then(response => {
                setData(response.data)
            })
            .catch(err => {
                setError(err.message)
            })
            .finally(() => {
                setIsFetching(false)
            })
        return () => {}
    }, [url,...dependencies])


    return { data, setData, isFetching, error }
}