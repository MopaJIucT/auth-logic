import type {
    ChangePasswordRequest,
    ChangeUsernameRequest,
    EmailForm,
    LoginForm,
    ProfileResponse,
    RegisterFormType,
    SendEmailResponse,
    VerificationForm, VerifyTokenResponse
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
    const res = await  fetch(initalUrl + '/api/auth/otp/generate', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(emailForm)
    })
    if(res.ok) {
        const data: SendEmailResponse = await res.json()
        return data
    } else {
        return null
    }
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
    const res = await fetch(initalUrl + '/api/auth/otp/verify', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(verificationForm)
    })
    console.log("fetch on")
    if(res.ok) {
        const data: VerifyTokenResponse = await res.json()
        return data
    } else {
        return null
    }
}

export async function sendRegisterForm(form: RegisterFormType, token: string) {
    const res = await fetch(initalUrl + '/api/auth/register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-Verification-Token": token
        },
        body: JSON.stringify(form)
    })
    if(res.ok) {
        const data = await res.json()
        return data.accessToken
    } else {
        return null
    }
}

export async function changeUsername(username: ChangeUsernameRequest) {
    const res = await fetch(initalUrl + '/api/auth/profile', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(username)
    })
    if(res.ok) {
        return true
    } else {
        return false
    }
}

export async function deleteUser(userPassword: ChangePasswordRequest) {
    const res = await fetch(initalUrl + '/api/auth/user-delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(userPassword)
    })
    if(res.ok) {
        return true
    } else {
        return false
    }
}
