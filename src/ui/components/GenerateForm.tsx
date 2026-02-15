import s from '../styles/Styles.module.css'
import Logo from "./Logo.tsx";
import CustomTextField from "./CustomTextField.tsx";
import CustomButton from "./CustomButton.tsx";
import {useState} from "react";
import {sendEmail} from "../../dal/api.ts";
import {Link} from "react-router-dom";

function GenerateForm() {
    const [email, setEmail] = useState<string>("");


    function handleEmailChange(email: string): void {
        const newEmail = email;
        setEmail(newEmail);
    }

    function sendFormEmail() {
        const formGenerate = {
            email: email,
            action: "ConfirmOldEmail"
        }
        sendEmail(formGenerate);
    }

    return (
        <div className={s.container}>
            <Logo />
            <div className={s.textContainer}>
                <h2>Memorise</h2>
                <p>Для регистрации укажи свою электронную почту,</p>
                <p>нужно будет потвердить.</p>
                <p>Можем <Link to={"/"} className={s.linkStyle}>вернуться</Link>, если вспомнил.</p>
            </div>
            <CustomTextField placeholder={"Введите свой email"} nameId={"email"} onChange={handleEmailChange} value={email} />
            <CustomButton onClick={sendFormEmail}/>
        </div>
    )
}

export default GenerateForm;
