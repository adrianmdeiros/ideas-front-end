import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies()

export const useCookies = () => {
    const [cookiesAgreed, setCookiesAgreed] = useState(false)

    useEffect(() => {
        const cookiesAgreement = getCookiesAgreement()

        if (cookiesAgreement) {
            setCookiesAgreed(true)
        }

    }, [])

    const agreeCookies = () => {
        cookies.set('cookiesAgreement', true, { httpOnly: true, secure: true})
        setCookiesAgreed(true)
    }

    const getCookiesAgreement = () => cookies.get('cookiesAgreement') === true
    
    return { cookiesAgreed, agreeCookies }
}
