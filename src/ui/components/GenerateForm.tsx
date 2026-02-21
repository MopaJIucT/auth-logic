import s from '../styles/Styles.module.css'
import Logo from "./Logo.tsx";
import CustomTextField from "./CustomTextField.tsx";
import CustomButton from "./CustomButton.tsx";
import {useState} from "react";
import {getVerifyToken, sendEmail} from "../../dal/api.ts";
import {Link} from "react-router-dom";
import type {EmailForm, VerificationEmail, VerificationForm} from "../../bll/types.ts";

function GenerateForm() {
    const [emailForm, setEmailForm] = useState<EmailForm>({
        "email": "",
        "action": "ConfirmOldEmail"
    });
    const [inProgressEmail, setInProgressEmail] = useState<string>("");

    function handleEmailChange(field: keyof EmailForm, value: string) {
        setEmailForm(prev => ({
            ...prev,
            [field]: value,
        }));
        setInProgressEmail(value);
    }

    function handleSendEmail(): void {
        console.log(emailForm);
        sendEmail(emailForm)
    }


    return (
        <div className={s.container}>
            <Logo/>
            <div className={s.textContainer}>
                <h2>Memorise</h2>
                <div>
                    <p>Для регистрации укажи свою электронную почту,</p>
                    <p>нужно будет потвердить.</p>
                    <p>Можем <Link to={"/login"}
                                   className={s.linkStyle}
                    >вернуться</Link>.</p>
                </div>
            </div>
            <CustomTextField placeholder={"Введите свой email"}
                             nameId={"email"}
                             onChange={(value) => handleEmailChange("email", value)}
                             />
            <CustomButton onClick={handleSendEmail} value={"присоединиться"}/>
            <VerificationEmail email={inProgressEmail}/>
        </div>
    )
}

export default GenerateForm;

function VerificationEmail({email}: VerificationEmail) {

    const [verificationForm, setVerificationForm] = useState<VerificationForm>({
        "otp": "",
        "email": "",
        "action": "ConfirmOldEmail"
    })

    function handleVerificationFormChange(field: keyof VerificationForm, value: string) {
        setVerificationForm(prev => ({
            ...prev,
            [field]: value,
        }));
    }

    function handleSendVerifyEmail(): void {
        getVerifyToken(verificationForm)
    }

    return (
        <div className={s.container}>
            <div className={s.textContainer}>
                <h2>Memorise</h2>
                <div>
                    <p>Выслали код потверждения на твою почту,</p>
                    <p>проверь её.</p>
                </div>
            </div>
            <CustomTextField placeholder={"Введите код потверждения"}
                             nameId={"email"}
                             onChange={(value) => {
                                 handleVerificationFormChange("email", email)
                                 handleVerificationFormChange("otp", value)
                             }}
            />
            <CustomButton onClick={handleSendVerifyEmail} value={"проверить"}/>
        </div>
    )
}

// export default VerificationEmail;
