import s from "../../styles/Styles.module.css";
import type {ModalProps} from "../../../bll/types.ts";

function Modal({message, onClose}: ModalProps) {
    return (
        <div className={s.overlay} onClick={onClose}>
            <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                <h4>Ошибка: {message}</h4>
                <button onClick={onClose}>Ок</button>
            </div>
        </div>
    );
}

export default Modal;
