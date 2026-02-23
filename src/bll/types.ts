export type TextFieldProps = {
    placeholder: string
    nameId: string
    onChange: (value: string) => void
    type?: string
    value?: string
    onBlur?: () => void
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

export type GenerateFormProps = {
    setNewUser: (verifyToken: string) => void
}

export type SendEmailResponse = {
    expiresAt: string
}

export type VerificationEmailProps = {
    email: string
    setNewUser: (verifyToken: string) => void
}

export type VerificationForm = {
    otp: string
    email: string
    action: string
}

export type VerifyTokenResponse = {
    verificationToken: string
}

export type RegisterFormProps = {
    verifyToken: string
    setUser: (user: ProfileResponse | null) => void
}

export type RegisterFormType = {
    login: string
    username: string
    password: string
}

export type ChangeUsernameRequest = {
    username: string
}

export type ChangePasswordRequest = {
    password: string
}
