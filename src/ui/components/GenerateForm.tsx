import s from '../styles/Styles.module.css'
import Logo from "./Logo.tsx";
import CustomTextField from "./CustomTextField.tsx";
import CustomButton from "./CustomButton.tsx";
import {useState} from "react";
import {sendEmail} from "../../dal/api.ts";
import {Link} from "react-router-dom";
import type {EmailForm} from "../../bll/types.ts";
import VerificationEmail from "./VerificationEmail";


function GenerateForm() {
    const [emailForm, setEmailForm] = useState<EmailForm>({
        "email": "",
        "action": "Register"
    });
    const [inProgressEmail, setInProgressEmail] = useState<string>("");

    function handleEmailChange(field: keyof EmailForm, value: string) {
        setEmailForm(prev => ({
            ...prev,
            [field]: value,
        }));
    }

    function handleSendEmail(): void {
        console.log(emailForm);
        sendEmail(emailForm)
        setInProgressEmail(emailForm.email)
    }


    return (
        <div>
            {inProgressEmail ? <VerificationEmail email={inProgressEmail}/> : <div className={s.container}>
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
                </div>
            }
        </div>
    )
}

export default GenerateForm;

