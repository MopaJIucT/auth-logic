import {useState} from "react"
import type {EmailForm, UseSendEmailProps} from "../types.ts"
import {sendEmail} from "../../dal/api.ts"

export function useSendEmail({setError, setInProgressEmail}: UseSendEmailProps) {
    const [emailForm, setEmailForm] = useState<EmailForm>({
        "email": "",
        "action": "Register"
    })

    function isEmail(email: string): boolean {
        const regex = /\S+@\S+\.\S+/
        return regex.test(email)
    }

    function handleEmailChange(field: keyof EmailForm, value: string) {
        setEmailForm(prev => ({
            ...prev,
            [field]: value,
        }))
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
    return {handleEmailChange, handleSendEmail}
}