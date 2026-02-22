import s from "../styles/Styles.module.css";
import Logo from "./Logo.tsx";
import CustomTextField from "./CustomTextField.tsx";
import CustomButton from "./CustomButton.tsx";
import type {RegisterFormProps, RegisterFormType} from "../../bll/types.ts";
import {useState} from "react";
import {getProfile, sendRegisterForm} from "../../dal/api.ts";
import {useNavigate} from "react-router-dom";

function RegisterForm({verifyToken,setUser}: RegisterFormProps) {
    const [registerForm, setRegisterForm] = useState<RegisterFormType>({
        "login": "",
        "username": "",
        "password": ""
    });

    const navigate = useNavigate();

    function handleRegisterFormChange(field: keyof RegisterFormType, value: string) {
        setRegisterForm(prev => ({
            ...prev,
            [field]: value,
        }));
    }

    async function handleSendRegisterForm() {
        const token:string | null = await sendRegisterForm(registerForm, verifyToken)
        if (token) {
            localStorage.setItem("token", token);
            const res = getProfile()
            res.then((profile) => {
                setUser(profile)
                navigate("/profile")
            }).catch(() => {
                return null
            })
        }
    }

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
                             handleRegisterFormChange("login", value)}}
        />
        <CustomTextField placeholder={"Придумай имя"}
                         nameId={"username"}
                         onChange={(value: string) => {
                             handleRegisterFormChange("username", value)}}
        />
        <CustomTextField placeholder={"И пароль"}
                         nameId={"password"}
                         onChange={(value: string) => {
                             handleRegisterFormChange("password", value)}}
        />
        <CustomButton onClick={handleSendRegisterForm} value={"присоединиться"}/>
    </div>)
}

export default RegisterForm;
