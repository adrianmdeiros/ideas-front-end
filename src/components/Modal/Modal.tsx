import GlobalStyle from "../../styles/global";
import { CloseButton, StyledContainer, StyledModal } from "./style";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setOpenModal: () => void;
};

const Modal: React.FC<ModalProps> = ({ setOpenModal, isOpen, children }) => {
  if (isOpen) {
    return (
      <>
        <GlobalStyle />
        <StyledContainer onClick={setOpenModal}>
          <StyledModal>
            <CloseButton onClick={setOpenModal}/>
            {children}
          </StyledModal>
        </StyledContainer>
      </>
    );
  }else{
    return null
  }
};

export default Modal;
