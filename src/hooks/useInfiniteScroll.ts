import { RefObject, useEffect, useState } from "react";

export function useInfiniteScroll(
    refElement: RefObject<HTMLDivElement>
) {

    const [currentPage, setCurrentPage] = useState<number>(1)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                loadMoreContent()
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

    const loadMoreContent = () => setCurrentPage(prevPage => prevPage + 1)

    return { currentPage }
} 