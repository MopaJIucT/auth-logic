import s from "../styles/Styles.module.css"
import {Link} from "react-router-dom"
import Logo from "./Logo.tsx"
import CustomTextField from "./CustomTextField.tsx"
import CustomButton from "./CustomButton.tsx"
import {useState} from "react"
import {getProfile, sendFormLogin} from "../../dal/api.ts"
import type {LoginForm, LoginProps} from "../../bll/types.ts"

function Login({setUser}: LoginProps) {
    const [formLogin, setFormLogin] = useState<LoginForm>({
        login: "",
        password: "",
    });

    function handleChange(field: keyof LoginForm, value: string) {
        setFormLogin(prev => ({
            ...prev,
            [field]: value
        }));
    }

    async function handleSubmit() {
        const token: string | null = await sendFormLogin(formLogin)
        if (token != null) {
            localStorage.setItem("token", token as string)
            getProfile().then((profileResponse) => {
                    setUser(profileResponse)
                }
            )
        } else {
            setUser(null)
        }
    }

    return (
        <div className={s.container}>
            <Logo/>
            <div className={s.textContainer}>
                <h2>Memorise</h2>
                <p>Введите свои данные.</p>
                <p>Еще не с нами?{" "}
                    <Link to={'/generate'}
                          className={s.linkStyle}
                    >Тогда сюда</Link></p>
            </div>
            <CustomTextField placeholder={"Логин"}
                             nameId={"login"}
                             onChange={(value) => handleChange("login", value)}
            />
            <CustomTextField placeholder={"Пароль"}
                             nameId={"Пароль"}
                             type={'password'}
                             onChange={(value) => handleChange("password", value)}
            />
            <CustomButton onClick={handleSubmit} value={"войти"}/>
        </div>
    )
}

export default Login;
