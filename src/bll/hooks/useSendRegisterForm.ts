import {useState} from "react";
import type {RegisterFormType, UseSendRegisterFormProps} from "../types.ts"
import {useNavigate} from "react-router-dom"
import {getProfile, sendRegisterForm} from "../../dal/api.ts"

export function useSendRegisterForm({verifyToken, setUser, setError}: UseSendRegisterFormProps){
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
        const resToken = await sendRegisterForm(registerForm, verifyToken)
        if (resToken.ok) {
            const data = await resToken.json()
            localStorage.setItem("token", data.accessToken)
            const res = getProfile()
            res.then((profile) => {
                setUser(profile)
                navigate("/profile")
            }).catch(() => {
                return null
            })
        } else {
            setError(
                "Неподходящие параметры.\n" +
                "Логин — не короче 3-х символов нижнего регистра.\n" +
                "Имя — не короче 3-х символов любого регистра (допускается пробел).\n" +
                "Пароль — не менее 8 символов."
            )
        }
    }
    return {handleRegisterFormChange, handleSendRegisterForm}
}
