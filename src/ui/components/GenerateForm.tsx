import s from '../styles/Styles.module.css'
import Logo from "./Logo.tsx";
import CustomTextField from "./CustomTextField.tsx";
import CustomButton from "./CustomButton.tsx";
import {useState} from "react";
import {sendEmail} from "../../dal/api.ts";
import {Link} from "react-router-dom";
import type {EmailForm, GenerateFormProps} from "../../bll/types.ts";
import VerificationEmail from "./VerificationEmail";


function GenerateForm({setNewUser}: GenerateFormProps) {
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

    async function handleSendEmail(){
        const res = await sendEmail(emailForm)
        if(res) setInProgressEmail(emailForm.email)
    }


    return (
        <div>
            {inProgressEmail ? <VerificationEmail email={inProgressEmail}
                                                  setNewUser={setNewUser}

            /> : <div className={s.container}>
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

