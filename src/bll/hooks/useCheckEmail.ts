import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {UseCheckEmailProps, VerificationForm, VerifyTokenResponse} from "../types.ts";
import {getVerifyToken} from "../../dal/api.ts";

export function useCheckEmail({email, setNewUser, setError}: UseCheckEmailProps) {
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
        const res  = await getVerifyToken(verificationForm)
        if (res.ok) {
            const data: VerifyTokenResponse = await res.json()
            setNewUser(data.verificationToken)
            navigate('/register')
        } else {
            setError("Этот код не подходит")
        }
    }
    return {handleVerificationFormChange, handleSendVerifyEmail}
}