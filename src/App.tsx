import {Navigate, Route, Routes} from "react-router-dom"
import s from './ui/styles/Styles.module.css'
import Login from "./ui/components/Login.tsx"
import GenerateForm from "./ui/components/GenerateForm.tsx"
import {useEffect, useState} from "react"
import Profile from "./ui/components/Profile.tsx"
import {getProfile} from "./dal/api.ts"
import type {ProfileResponse} from "./bll/types.ts"
import Loader from "./ui/components/Loader.tsx"
import RegisterForm from "./ui/components/RegisterForm.tsx";

function App() {

    const [user, setUser] = useState<ProfileResponse | null>(null)
    const [newUser, setNewUser] = useState<string | null>(null)
    const [loader, setLoader] = useState<boolean>(true)

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

    return (
        <div className={s.mainContainer}>
            {loader ? <Loader/> : (
                <Routes>
                    <Route
                        path="/login"
                        element={user
                            ? <Navigate to="/profile"/>
                            : <Login setUser={setUser}/>}
                    />
                    <Route
                        path="/generate"
                        element={<GenerateForm setNewUser={setNewUser}/>}
                    />
                    <Route
                        path="/profile"
                        element={user
                            ? <Profile setUser={setUser}
                                       user={user}
                            />
                            : <Navigate to="/login"/>}
                    />
                    <Route path="/register"
                           element={newUser
                               ? <RegisterForm verifyToken={newUser}
                                               setUser={setUser}
                               />
                               : <Navigate to="/generate"/>}
                    />
                    <Route
                        path="/*"
                        element={<Navigate to="/login"/>}
                    />
                </Routes>
            )}
        </div>
    )
}

export default App
