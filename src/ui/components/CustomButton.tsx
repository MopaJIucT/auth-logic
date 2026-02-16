import type {CustomButtonProps} from "../../bll/types.ts";
import s from "../styles/Styles.module.css";

function CustomButton({onClick, value}: CustomButtonProps) {
    return (
        <div className={s.buttonContainer}>
            <button onClick={onClick}>{value}</button>
        </div>
    )
}

export default CustomButton;
