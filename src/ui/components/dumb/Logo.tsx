import s from "../../styles/Styles.module.css";
import logo from "../../../public/images/logo.png";

function Logo() {
    return (
        <div className={s.logo}>
            <img src={logo} alt='#'/>
        </div>
    )
}

export default Logo;