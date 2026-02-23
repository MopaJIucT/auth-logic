import type {VerificationEmailProps} from "../../../bll/types.ts";
import s from "../../styles/Styles.module.css";
import Logo from "../dumb/Logo.tsx";
import CustomTextField from "../dumb/CustomTextField.tsx";
import CustomButton from "../dumb/CustomButton.tsx";
import {useCheckEmail} from "../../../bll/hooks/useCheckEmail.ts";

function VerificationEmail({email, setNewUser, setError}: VerificationEmailProps) {

    const {handleVerificationFormChange, handleSendVerifyEmail} = useCheckEmail({email, setNewUser, setError});

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
