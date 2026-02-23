import s from "../../styles/Styles.module.css"
import Logo from "../dumb/Logo.tsx"
import CustomTextField from "../dumb/CustomTextField.tsx"
import CustomButton from "../dumb/CustomButton.tsx"
import type {RegisterFormProps} from "../../../bll/types.ts"
import {useSendRegisterForm} from "../../../bll/hooks/useSendRegisterForm.ts"

function RegisterForm({verifyToken, setUser, setError}: RegisterFormProps) {

    const {handleRegisterFormChange, handleSendRegisterForm} = useSendRegisterForm({verifyToken, setUser, setError})

    return (
        <div className={s.container}>
            <Logo/>
            <div className={s.textContainer}>
                <h2>Memorise</h2>
                <div>
                    <p>Отлично, укажи свои данные</p>
                    <p>и добро пожаловать!</p>
                </div>
            </div>
            <CustomTextField placeholder={"Придумай себе логин"}
                             nameId={"login"}
                             onChange={(value: string) => {
                                 handleRegisterFormChange("login", value)
                             }}
            />
            <CustomTextField placeholder={"Придумай имя"}
                             nameId={"username"}
                             onChange={(value: string) => {
                                 handleRegisterFormChange("username", value)
                             }}
            />
            <CustomTextField placeholder={"И пароль"}
                             nameId={"password"}
                             onChange={(value: string) => {
                                 handleRegisterFormChange("password", value)
                             }}
            />
            <CustomButton onClick={handleSendRegisterForm} value={"присоединиться"}/>
        </div>)
}

export default RegisterForm
