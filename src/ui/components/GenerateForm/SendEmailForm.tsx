import type {SendEmailFormProps} from "../../../bll/types.ts"
import s from "../../styles/Styles.module.css"
import Logo from "../dumb/Logo.tsx"
import {Link} from "react-router-dom"
import CustomTextField from "../dumb/CustomTextField.tsx"
import CustomButton from "../dumb/CustomButton.tsx"
import {useSendEmail} from "../../../bll/hooks/useSendEmail.ts";

function SendEmailForm({setError, setInProgressEmail}: SendEmailFormProps) {

    const {handleEmailChange, handleSendEmail} = useSendEmail({setError, setInProgressEmail})

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

export default SendEmailForm