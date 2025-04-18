import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './styles.module.css'

import Button from '../Button'
import Loader from '../Loader'


type ContactFormProps = {
    title: string
    label: string
    saveEmail?: (email: string, e: FormEvent<HTMLFormElement>) => void
    savePhone?: (phone: string, e: FormEvent<HTMLFormElement>) => void
    isSaving: boolean
}

const ContactForm = (props: ContactFormProps) => {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        if (props.saveEmail) {
            props.saveEmail(email, e)
        } else if (props.savePhone) {
            props.savePhone(phone, e)
        }
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (props.label === 'Email') {
            setEmail(e.target.value)
        } else if (props.label === 'Telefone') {
            setPhone(e.target.value)
        }
    }

    return (
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <h3>{props.title}</h3>
            <label htmlFor={props.label}>{props.label}</label>
            <input className={styles.input} type={props.label} name={props.label} id={props.label} placeholder={`Digite seu ${props.label}`} onChange={(e) => handleOnChange(e)}
            />
            <Button terciary>
                {props.isSaving ? (
                    <>
                        <Loader />
                    </>
                ) : <p>Salvar</p>
                }
            </Button>
        </form>
    )
}

export default ContactForm