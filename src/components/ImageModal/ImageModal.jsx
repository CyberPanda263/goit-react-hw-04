import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onRequestClose, imageUrl }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className={css.modal}
    >
      <div>
        <img src={imageUrl} style={{ maxWidth: "1200px", maxHeight: "800px", objectFit: "contain" }} />
      </div>
    </Modal>
  );
};

export default ImageModal;