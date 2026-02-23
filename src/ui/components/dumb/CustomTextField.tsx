import s from "../../styles/Styles.module.css";
import type {TextFieldProps} from "../../../bll/types.ts";

function CustomTextField({placeholder, nameId, onChange, type, value, onBlur}: TextFieldProps) {
    return (
        <div className={s.customTextField}>
            <input placeholder={placeholder}
                   className={s.glassInput}
                   name={nameId}
                   type={type}
                   value={value}
                   onChange={(e)=> onChange(e.currentTarget.value)}
                   onBlur={onBlur}
            />
        </div>
    )
}

export default CustomTextField;