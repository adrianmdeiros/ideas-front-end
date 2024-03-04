import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './ContactForm.module.css'

import Button from '../Button/Button'
import Loader from '../Loader/Loader'


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
            <input className={styles.input} type={props.label} name={props.label} id={props.label} placeholder={`Digite seu ${props.label}`} required onChange={(e) => handleOnChange(e)}
            />
            <Button backgroundColor="#f5f5f5" hover="#dedede" color="#101010" borderRadius=".8rem">
                {props.isSaving ? (
                    <>
                        <Loader />
                        <p>Salvando</p>
                    </>
                ) : <p>Salvar</p>
                }
            </Button>
        </form>
    )
}

export default ContactForm