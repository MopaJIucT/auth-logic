import s from "../styles/Styles.module.css"
import Logo from "./Logo.tsx"
import CustomButton from "./CustomButton.tsx"
import type {ProfileProps} from "../../bll/types.ts"
import {changeUsername, deleteUser, getLogout, getProfile} from "../../dal/api.ts"
import {useState} from "react"
import CustomTextField from "./CustomTextField.tsx"

function Profile({setUser, user}: ProfileProps) {

    const [activeNameInput, setActiveNameInput] = useState<"delete" | "username" | "">("")
    const [passwordValue, setPasswordValue] = useState<string>("")
    const [usernameValue, setUsernameValue] = useState<string>("")

    function handleDelete() {
        setActiveNameInput("delete")
    }
    function handleUpdateUsername() {
        setActiveNameInput("username")
    }

    async function sendChangeUsername() {
        const newUsername = {username: usernameValue}
        const res: boolean = await changeUsername(newUsername)
        if (res) {
            const res = getProfile()
            res.then((user) => {
                setUser(user)
            }).catch(() => {
                setUser(null)
            })
        }
    }

    function handleLogout() {
        setUser(null)
        getLogout()
        localStorage.clear()
    }

    async function sendDeleteUser() {
        const password = {password: passwordValue}
        const res: boolean = await deleteUser(password)
        if (res) {
            setUser(null)
        } else {
            return
        }
    }

    return (
        <div className={s.container}>
            <Logo/>
            <p>Имя: {user?.username}</p>
            <p>Логин: {user?.login}</p>
            {activeNameInput !== "username"
                ? <CustomButton onClick={handleUpdateUsername}
                                value={"Изменить имя"}
                />
            : <CustomTextField placeholder={"Новый логин"}
                               nameId={"username"}
                               type={"text"}
                               value={usernameValue}
                               onChange={value => setUsernameValue(value)}
                               onBlur={() => {
                                   setActiveNameInput("")
                                   sendChangeUsername()
                               }}
                />
            }
            <CustomButton onClick={handleLogout}
                          value={"выйти из аккаунта"}
            />
            {activeNameInput !== "delete"
                ? <CustomButton onClick={handleDelete}
                                value={"удалить аккаунт"}
                />
                : <CustomTextField placeholder={"Пароль"}
                                   nameId={"password"}
                                   type={"password"}
                                   value={passwordValue}
                                   onChange={value => setPasswordValue(value)}
                                   onBlur={() => {
                                       console.log("fgggg")
                                       setActiveNameInput("")
                                       sendDeleteUser()
                                   }}

                />}
        </div>
    )
}

export default Profile;
