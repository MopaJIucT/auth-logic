import type {EmailForm, SendEmailFormProps} from "../../../bll/types.ts";
import {useState} from "react";
import {sendEmail} from "../../../dal/api.ts";
import s from "../../styles/Styles.module.css";
import Logo from "../dumb/Logo.tsx";
import {Link} from "react-router-dom";
import CustomTextField from "../dumb/CustomTextField.tsx";
import CustomButton from "../dumb/CustomButton.tsx";

function SendEmailForm({setError, setInProgressEmail}: SendEmailFormProps) {

    const [emailForm, setEmailForm] = useState<EmailForm>({
        "email": "",
        "action": "Register"
    });

    function isEmail(email: string): boolean {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    function handleEmailChange(field: keyof EmailForm, value: string) {
        setEmailForm(prev => ({
            ...prev,
            [field]: value,
        }));
    }

    async function handleSendEmail() {
        if(isEmail(emailForm.email)) {
            const res = await sendEmail(emailForm)
            if (res.ok) {
                setInProgressEmail(emailForm.email)
            } else if (res.status === 400) {
                setError("Неправильно указана почта")
            } else if (res.status === 429) {
                setError("Слишком много запросов")
            } else {
                setError("Неизвестная ошибка")
            }
        } else {
            setError("Некорректный адрес")
        }
    }

    return <div className={s.container}>
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

export default SendEmailForm;