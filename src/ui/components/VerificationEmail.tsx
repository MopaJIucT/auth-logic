import {useState} from "react";
import type {VerificationForm, VerificationEmailProps, VerifyTokenResponse} from "../../bll/types.ts";
import {getVerifyToken} from "../../dal/api.ts";
import s from "../styles/Styles.module.css";
import Logo from "./Logo.tsx";
import CustomTextField from "./CustomTextField.tsx";
import CustomButton from "./CustomButton.tsx";
import {useNavigate} from "react-router-dom";

function VerificationEmail({email, setNewUser}: VerificationEmailProps) {

    const navigate = useNavigate();

    const [verificationForm, setVerificationForm] = useState<VerificationForm>({
        "otp": "",
        "email": email,
        "action": "Register"
    })

    function handleVerificationFormChange(field: keyof VerificationForm, value: string) {
        setVerificationForm(prev => ({
            ...prev,
            [field]: value,
        }));
    }

    async function handleSendVerifyEmail() {
        const verifyToken: VerifyTokenResponse | null  = await getVerifyToken(verificationForm)
        if (verifyToken) {
            setNewUser(verifyToken.verificationToken)
            navigate('/register')
        } else {
            return null
        }
    }

    return (
        <div className={s.container}>
            <Logo/>
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
                                 handleVerificationFormChange("otp", value)
                             }}
                             type="number"
            />
            <CustomButton onClick={handleSendVerifyEmail} value={"проверить"}/>
        </div>
    )
}

export default VerificationEmail;
