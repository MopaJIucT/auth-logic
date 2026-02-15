export type TextFieldLoginProps = {
    placeholder: string
    nameId: string
    onChange: (value: string) => void
    type?: string
    value?: string
}

export type LoginProps = {
    setToken: (token: string) => void
}

export type LoginForm = {
    login: string
    password: string
}

export type emailForm = {
    email: string
    action: string
}
