import React, { useContext, useState } from "react";
import styles from "./styles.module.css";
import { Edit, HelpCircle, Info, LogOut, Mail, Phone, Trash2 } from "react-feather";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/Auth";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../../components/Menu";
import Modal from "../../components/Modal";
import api from "../../api/api";
import Loader from "../../components/Loader";
import ContactForm from "../../components/ContactForm";
import toast from "react-hot-toast";
import { userIsServant } from "../../utils/userIsServant";
import { useFetch } from "../../hooks/useFetch";

type UserContacts = {
  email: string;
  phone: string;
}

const Perfil: React.FC = () => {
  const auth = useContext(AuthContext);
  const userPhoto = auth.user?.url_foto_150x200;

  const { data: contacts, setData: setContacts, isFetching } = useFetch<UserContacts | null>(`${api.defaults.baseURL}/users/contacts?userId=${auth.user?.id}`)

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false)

  const navigate = useNavigate();

  const handleLogOut = () => {
    auth.signOut();
    navigate("/login");
  };

  const saveEmail = async (email: string, e: any) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await api.put(`/users/contacts?userId=${auth.user?.id}`, {
        email: email
      })
      setContacts(response.data)
      toast.success('Salvo com sucesso.')
      setIsSaving(false)
      setIsEmailModalOpen(false)
    } catch {
      setIsSaving(false)
      toast.error('Erro ao salvar.')
    }

  }

  const savePhone = async (phone: string, e: any) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await api.put(`/users/contacts?userId=${auth.user?.id}`, {
        phone: phone
      })
      setContacts(response.data)
      toast.success('Salvo com sucesso.')
      setIsSaving(false)
      setIsPhoneModalOpen(false)
    } catch {
      setIsSaving(false)
      toast.error('Erro ao salvar.')
    }

  }


  return (
    <>
      <div className={styles.body}>
        <Menu />
        <div className={styles.container}>
          <Header title={'Perfil'}>
            <Link to={'/'} onClick={handleLogOut} className={styles.logout}>
              Sair
              <LogOut size={18} />
            </Link>
          </Header>
          <div className={styles.userContainer}>
            <div className={styles.card}>
              <div className={styles.top}>
                <img
                  className={styles.userPhoto}
                  src={userPhoto}
                  alt="foto de perfil"
                />
                <div className={styles.info}>
                  <h3 >{auth.user?.nome_usual}</h3>
                  <p>{auth.user?.vinculo.curso}</p>
                  <p>{auth.user?.vinculo.setor_suap}</p>
                  <p>IFMA Campus - {auth.user?.vinculo.campus}</p>
                  <p>{auth.user?.tipo_vinculo}</p>
                </div>
              </div>
              {userIsServant() && (
                <>
                  <div className={styles.bottom}>
                    <h3>Meus contatos</h3>
                    <div className={styles.contacts}>
                      <div>
                        <div className={styles.email}>
                          <div>
                            <p style={{ display: 'flex', gap: '.8rem', alignItems: 'center', marginBottom: '1rem' }}>  Email </p>
                            <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center', wordBreak: 'break-word' }}>
                              <Mail size={18} />
                              <p>{contacts?.email ? contacts.email : "-"}</p>
                              {isFetching && <Loader />}
                            </div>
                          </div>
                          <div className={styles.actions}>
                            <div className={styles.contact} onClick={() => setIsEmailModalOpen(true)}>
                              <Edit size={22} cursor={'pointer'} />
                            </div>
                            <div className={styles.contact} onClick={(e) => saveEmail('', e)}>
                              <Trash2 size={22} cursor={'pointer'} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <Modal isOpen={isEmailModalOpen} setOpenModal={() => setIsEmailModalOpen(!isEmailModalOpen)} >
                        <ContactForm title={'Adicionar ou editar email'} label={'Email'} isSaving={isSaving} saveEmail={saveEmail} />
                      </Modal>
                      <div>
                        <div className={styles.phone}>
                          <div>
                            <p style={{ display: 'flex', gap: '.8rem', alignItems: 'center', marginBottom: '1rem' }}> Telefone</p>
                            <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center' }}>
                              <Phone size={18} />
                              <p>{contacts?.phone ? contacts.phone : "-"}</p>
                              {isFetching && <Loader />}
                            </div>
                          </div>
                          <div className={styles.actions}>
                            <div className={styles.contact} onClick={() => setIsPhoneModalOpen(true)}>
                              <Edit size={22} cursor={'pointer'} />
                            </div>
                            <div className={styles.contact} >
                              <Trash2 size={22} cursor={'pointer'} onClick={(e) => savePhone('', e)} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <Modal isOpen={isPhoneModalOpen} setOpenModal={() => setIsPhoneModalOpen(!isPhoneModalOpen)} >
                        <ContactForm title={'Adicionar ou editar telefone'} label={'Telefone'} isSaving={isSaving} savePhone={savePhone} />
                      </Modal>
                    </div>
                  </div>
                  <p className={styles.help} onClick={() => setIsInfoModalOpen(true)}><HelpCircle />Por que adicionar meus contatos?</p>
                  <Modal isOpen={isInfoModalOpen} setOpenModal={() => setIsInfoModalOpen(!isInfoModalOpen)}>
                    <div>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}> <Info />Contatos do autor</h3>
                      <br />
                      <p style={{ textIndent: '0', color: '#ccccccdc', maxWidth: '38rem' }} >
                        Os contatos adicionados aparecerão em suas oportunidades de projeto cadastradas no mural. Isso fará com que os alunos interessados em participar do projeto possam entrar em contato com você mais facilmente.
                      </p>
                    </div>
                  </Modal>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Perfil;
