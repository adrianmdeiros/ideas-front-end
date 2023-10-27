import React, { FormEvent, useContext, useState } from "react";
import styles from "./Perfil.module.css";
import GlobalStyle from "../../styles/global";
import { Edit, LogOut, Mail, Phone, Trash2 } from "react-feather";
import Header from "../../components/Header/Header";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import api from "../../api/api";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";

type Contacts ={
  email: string
  phone: string
}

const Perfil: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  const { data: contacts, setData: setContacts, isFetching } = useFetch<Contacts>(`https://api-projif.vercel.app/users/${auth.user?.id}/contacts`)
  
  const userPhoto = `https://suap.ifma.edu.br${auth.user?.url_foto_150x200}`;
  const handleLogOut = async () => {
    await auth.signOut();
    navigate("/login");
  };

  const saveEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const response = await api.put(`/users/${auth.user?.id}`, {
      email: email
    })
    setLoading(false)
    setIsModalOpen(false)

    setContacts(response.data)
  }
  
  const savePhone = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const response = await api.put(`/users/${auth.user?.id}`, {
      phone: phone
    })
    
    setIsPhoneModalOpen(false)
    setLoading(false)
    setContacts(response.data)
  }

  return (
    <>
      <div className={styles.body}>
        <GlobalStyle />
        <Menu />

        <div className={styles.container}>
          <Header padding="2rem">
            <h2 className={styles.title}>Meu Perfil</h2>
          </Header>
          <hr />
          <div className={styles.userContainer}>
            <div className={styles.card}>
              <div className={styles.top}>
                <img
                  className={styles.userPhoto}
                  src={userPhoto}
                  alt="foto de perfil"
                  />
                <div>
                  <h2 >{auth.user?.nome_usual} </h2>
                  <p>{auth.user?.vinculo.curso}</p>
                  <p>IFMA Campus - {auth.user?.vinculo.campus}</p>
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.contact}>
                  <div className={styles.email}>
                    <Mail size={18} />
                    {isFetching && <Loader />}
                    <p>{contacts?.email ? contacts.email : "Adicione um email"}</p>
                  </div>
                  <Edit cursor={'pointer'} onClick={() => setIsModalOpen(true)}/>
                  {/* <Trash2 cursor={'pointer'} onClick={() => setIsModalOpen(true)}/> */}
                </div>
                <Modal isOpen={isModalOpen} setOpenModal={() => setIsModalOpen(!isModalOpen)} >
                  <form className={styles.form} onSubmit={saveEmail}>
                    <h2>Adicionar um email</h2>
                    <label htmlFor="email">Email</label>
                    <input className={styles.input} type="email" name="email" id="email" placeholder="Digite seu email..." required onChange={(e) => setEmail(e.target.value)} />
                    <Button  backgroundColor="#f5f5f5" hover="#dedede" color="#101010" borderRadius=".8rem">
                    {loading ? (
                        <>
                          <Loader /> 
                          <p>Salvando</p> 
                        </>
                      ) : <p>Salvar</p>
                    }
                    </Button>
                  </form>
                </Modal>
                <div className={styles.contact}>
                  <div className={styles.phone}>
                    <Phone size={18} />
                    {isFetching && <Loader />}
                    
                    <p>{contacts?.phone ? contacts.phone : "Adicione um telefone"}</p>
                  </div>
                  <Edit  cursor={'pointer'} onClick={() => setIsPhoneModalOpen(true)}/>
                  {/* <Trash2 cursor={'pointer'} onClick={() => setIsModalOpen(true)}/> */}
                </div>
                <Modal isOpen={isPhoneModalOpen} setOpenModal={() => setIsPhoneModalOpen(!isPhoneModalOpen)} >
                  <form className={styles.form} onSubmit={savePhone}>
                    <h2>Adicionar um telefone</h2>
                    <label htmlFor="phone">Telefone</label>
                    <input minLength={11} className={styles.input} type="number" name="phone" id="phone" placeholder="Digite seu telefone..." required  onChange={(e) => setPhone(e.target.value)}/>
                    <Button  backgroundColor="#f5f5f5" hover="#dedede" color="#101010" borderRadius=".8rem">
                      {loading ? (
                        <>
                          <Loader /> 
                          <p>Salvando</p> 
                        </>
                      ) : <p>Salvar</p> 
                      }
                    </Button>
                  </form>
                </Modal>
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
