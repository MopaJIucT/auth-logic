import s from "../styles/Styles.module.css";
import type {TextFieldLoginProps} from "../../bll/types.ts";

function CustomTextField({placeholder, nameId, onChange, type, value}: TextFieldLoginProps) {
    return (
        <div className={s.customTextField}>
            <input placeholder={placeholder}
                   className={s.glassInput}
                   name={nameId}
                   type={type}
                   value={value}
                   onChange={(e)=> onChange(e.currentTarget.value)}
            />
        </div>
    )
}

export default CustomTextField;