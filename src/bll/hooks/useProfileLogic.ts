import {useState} from "react";
import {changeUsername, deleteUser, getLogout, getProfile} from "../../dal/api.ts";
import type {UseProfileLogicProps} from "../types.ts";

export function useProfileLogic({setUser, setError}: UseProfileLogicProps) {
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
        const res = await changeUsername(newUsername)
        if (res.ok) {
            const res = getProfile()
            res.then((user) => {
                setUser(user)
            }).catch(() => {
                setUser(null)
            })
        } else {
            setError("Имя не подходит, нужно от 3 символов любого регистра (допускается пробел)")
        }
    }

    function handleLogout() {
        setUser(null)
        getLogout()
        localStorage.clear()
    }

    async function sendDeleteUser() {
        const password = {password: passwordValue}
        const res= await deleteUser(password)
        if (res.ok) {
            setUser(null)
        } else {
            setError("Не тот пароль")
        }
    }
    return {activeNameInput, setActiveNameInput,
        passwordValue, setPasswordValue,
        usernameValue, setUsernameValue, handleUpdateUsername,
        sendChangeUsername, handleLogout, handleDelete, sendDeleteUser}
}
