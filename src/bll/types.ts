export type TextFieldLoginProps = {
    placeholder: string
    nameId: string
    onChange: (value: string) => void
    type?: string
    value?: string
}

export type CustomButtonProps = {
    onClick: () => void
    value: string
}

export type LoginProps = {
    setToken: (token: string) => void
}

export type LoginForm = {
    login: string
    password: string
}

export type EmailForm = {
    email: string
    action: string
}

export type ProfileProps = {
    setToken: (token: string | null) => void
}
