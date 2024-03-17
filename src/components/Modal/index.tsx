import { X } from "react-feather";
import styles from "./styles.module.css"

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setOpenModal: () => void;
};

const Modal: React.FC<ModalProps> = ({ setOpenModal, isOpen, children }) => {
  if (isOpen) {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.modal}>
            <X className={styles.closeButton} onClick={setOpenModal}/>
            {children}
          </div>
        </div>
      </>
    );
  }else{
    return null
  }
};

export default Modal;
