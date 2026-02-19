import type {EmailForm, LoginForm, ProfileResponse} from "../bll/types.ts";

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

export function sendEmail(emailForm: EmailForm) {
    fetch(initalUrl + '/api/auth/otp/generate', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
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
