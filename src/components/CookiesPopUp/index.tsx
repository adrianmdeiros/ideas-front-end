import React from "react"
import { useCookies } from "../../hooks/useCookies"
import Button from "../Button"
import styles from './styles.module.css'

const CookiesPopUp: React.FC = () => {
    const { cookiesAgreed, agreeCookies } = useCookies()

    const handleCookiesAgreement = () => {
        return agreeCookies()
    }

    return (
        <>
            {!cookiesAgreed && <div>
                <div className={styles.container}>
                    <div className={styles.header}>
                        🍪
                        <p>Este site utiliza cookies para uma melhor experiencia de autenticação.</p>
                    </div>
                    <Button 
                        primary
                        onClick={handleCookiesAgreement}
                    >
                        Entendi
                    </Button>
                </div>
            </div>
            }
        </>
    )
}

export default CookiesPopUp
