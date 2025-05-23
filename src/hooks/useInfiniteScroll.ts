import { RefObject, useEffect } from "react";

export function useInfiniteScroll(
    refElement: RefObject<HTMLDivElement>,
    callback: () => void,
    isFetching: boolean
) {

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting) && !isFetching) {
                callback()
            }
        })

        if (refElement.current) {
            observer.observe(refElement.current)
        }

        return () => {
            if (refElement.current) {
                observer.disconnect()
            }
        }
    }, [])

} 