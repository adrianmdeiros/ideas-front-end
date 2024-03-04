import React, { FormEvent, useContext, useState } from "react";
import styles from "./Perfil.module.css";
import GlobalStyle from "../../styles/global";
import { Edit, LogOut, Mail, Phone } from "react-feather";
import Header from "../../components/Header/Header";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import Modal from "../../components/Modal/Modal";
import api from "../../api/api";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";
import ContactForm from "../../components/ContactForm/ContactForm";
import toast from "react-hot-toast";

type UserContacts = {
  email: string;
  phone: string;
}

const Perfil: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false)

  const { data: contacts, setData: setContacts, isFetching } = useFetch<UserContacts>(
    `${api.defaults.baseURL}/users/contacts?userid=${auth.user?.id}`)

  const userPhoto = auth.user?.url_foto_150x200;

  const handleLogOut = () => {
    auth.signOut();
    navigate("/login");
  };

  const saveEmail = async (email: string, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)

    const response = await api.put(`/users/contacts?userid=${auth.user?.id}`, {
      email: email
    })
    setIsSaving(false)
    setIsEmailModalOpen(false)

    setContacts(response.data)
    toast.success('Email salvo com sucesso.')
  }

  const savePhone = async (phone: string, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)

    const response = await api.put(`/users/contacts?userid=${auth.user?.id}`, {
      phone: phone
    })

    setIsPhoneModalOpen(false)
    setIsSaving(false)
    setContacts(response.data)
    toast.success('Telefone salvo com sucesso.')

  }


  return (
    <>
      <div className={styles.body}>
        <GlobalStyle />
        <Menu />
        <div className={styles.container}>
          <Header padding="2rem 0" height="9rem">
            <h1 className={styles.title}>Perfil</h1>
          </Header>
          <div className={styles.userContainer}>
            <div className={styles.card}>
              <div className={styles.top}>
                <img
                  className={styles.userPhoto}
                  src={userPhoto}
                  alt="foto de perfil"
                />
                <div>
                  <h3 >{auth.user?.nome_usual}</h3>
                  <p>{auth.user?.vinculo.curso}</p>
                  <p>IFMA Campus - {auth.user?.vinculo.campus}</p>
                  <p>{auth.user?.tipo_vinculo}</p>
                </div>
              </div>
              <div className={styles.bottom}>
                <h3>Meus contatos</h3>
                <div className={styles.contacts}>
                  <div className={styles.contact} onClick={() => setIsEmailModalOpen(true)}>
                    <p>Email</p>
                    <div className={styles.email}>
                      <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center' }}>
                        <Mail size={18} />
                        <p>{contacts?.email ? contacts.email : "Adicione seu email"}</p>
                        {isFetching && <Loader />}
                      </div>
                      <Edit cursor={'pointer'} />
                    </div>
                  </div>
                  <Modal isOpen={isEmailModalOpen} setOpenModal={() => setIsEmailModalOpen(!isEmailModalOpen)} >
                    <ContactForm title={'Adicionar ou editar email'} label={'Email'} isSaving={isSaving} saveEmail={saveEmail} />
                  </Modal>
                  <div className={styles.contact} onClick={() => setIsPhoneModalOpen(true)}>
                    <p>Telefone</p>
                    <div className={styles.phone}>
                      <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center' }}>
                        <Phone size={18} />
                        <p>{contacts?.phone ? contacts.phone : "Adicione seu número de telefone"}</p>
                        {isFetching && <Loader />}
                      </div>
                      <Edit cursor={'pointer'} />
                    </div>
                  </div>
                  <Modal isOpen={isPhoneModalOpen} setOpenModal={() => setIsPhoneModalOpen(!isPhoneModalOpen)} >
                    <ContactForm title={'Adicionar ou editar telefone'} label={'Telefone'} isSaving={isSaving} savePhone={savePhone}/>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <Link to={'/'} onClick={handleLogOut}>
              Sair
              <LogOut size={18} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Perfil;
