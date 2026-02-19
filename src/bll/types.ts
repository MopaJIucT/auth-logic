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
    setUser: (value: ProfileResponse | null) => void
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
    setUser: (user: ProfileResponse | null) => void
    user: ProfileResponse | null
}

export type ProfileResponse = {
    id: string
    username: string | null
    login: string | null
    avatarSrc: string | null
    createdAt: string
    lastModifiedAt: string | null
    email: string | null
    role: "User" | "Admin" | "Moderator" | "Support"
    tokens: number
    lastTokensResetAt: string | null
}
