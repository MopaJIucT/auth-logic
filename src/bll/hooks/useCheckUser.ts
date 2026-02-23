import {useEffect, useState} from "react";
import type {ProfileResponse} from "../types.ts";
import {getProfile} from "../../dal/api.ts";

export function useCheckUser() {
    const [user, setUser] = useState<ProfileResponse | null>(null)
    const [newUser, setNewUser] = useState<string | null>(null)
    const [loader, setLoader] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    function handleSetLoader() {
        setLoader(false)
    }

    useEffect(() => {
        if ((localStorage.getItem('token') ?? '').length > 0) {
            const res = getProfile()
            res.then((user) => {
                setUser(user)
            }).catch(() => {
                setUser(null)
            }).finally(() => {
                handleSetLoader()
            })
        } else {
            handleSetLoader()
        }
    }, [])
    return {user, setUser, newUser, setNewUser, loader, error, setError}
}
