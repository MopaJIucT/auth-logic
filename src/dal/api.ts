import type {
    ChangePasswordRequest,
    ChangeUsernameRequest,
    EmailForm,
    LoginForm,
    ProfileResponse,
    RegisterFormType,
    VerificationForm
} from "../bll/types.ts";

const initalUrl = 'https://dev-api.memorise.cards'

export async function sendFormLogin(formLogin: LoginForm) {
    const res = await fetch(initalUrl + '/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(formLogin)
    })
    if(res.ok) {
        const data = await res.json()
        localStorage.setItem("token", data.accessToken)
        return data.accessToken
    }
    return null
}

export async function sendEmail(emailForm: EmailForm) {
    return await  fetch(initalUrl + '/api/auth/otp/generate', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(emailForm)
    })
}

export function getLogout() {
    fetch(initalUrl + '/api/auth/logout', {
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
    })
}

export async function getProfile() {
    const res = await fetch(initalUrl + '/api/auth/profile', {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
    })
    if(res.ok) {
        const data:ProfileResponse = await res.json()
        return data
    } else {
        return null
    }
}

export async function getVerifyToken(verificationForm: VerificationForm) {
    return await fetch(initalUrl + '/api/auth/otp/verify', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(verificationForm)
    })
}

export async function sendRegisterForm(form: RegisterFormType, token: string) {
    return  await fetch(initalUrl + '/api/auth/register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-Verification-Token": token
        },
        body: JSON.stringify(form)
    })
}

export async function changeUsername(username: ChangeUsernameRequest) {
    return await fetch(initalUrl + '/api/auth/profile', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(username)
    })
}

export async function deleteUser(userPassword: ChangePasswordRequest) {
    return await fetch(initalUrl + '/api/auth/user-delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(userPassword)
    })
}
