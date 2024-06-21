import { useGlobalContext } from "../Info/Info";


const Modal = () => {
  const { modal, closeModal, correct, questions } = useGlobalContext();
  return (
    <div className={`${modal ? "modal-container isOpen" : "modal-container"}`}>
      <div className="modal-content">
        <h2>congrats</h2>
        <p>You answered {Math.round((correct / questions.length) * 100)}%</p>
        <button className="close-btn" onClick={closeModal}>
          play again
        </button>
      </div>
    </div>
  );
};
export default Modal;
