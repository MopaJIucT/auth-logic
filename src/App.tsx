import {Navigate, Route, Routes} from "react-router-dom";
import s from './ui/styles/Styles.module.css'
import Login from "./ui/components/Login.tsx";
import GenerateForm from "./ui/components/GenerateForm.tsx";
import {useEffect, useState} from "react";
import Profile from "./ui/components/Profile.tsx";
import {checkToken} from "./dal/api.ts";
import Logo from "./ui/components/Logo.tsx";

function App() {

    const [user, setUser] = useState<string | null>(null)
    const [loader, setLoader] = useState<boolean>()

    function setToken(token: string | null) {
        setUser(token)
    }
    function handleSetLoader(value: boolean) {
        setLoader(value)
    }

    useEffect(() => {
        handleSetLoader(true)
        if((localStorage.getItem('token') ?? '').length > 0) {
            <Navigate to='/profile' />
            return
        }
        const res = checkToken(handleSetLoader)
        console.log(res)
    },[])

    if (loader) {
        return (
            <div className={s.mainContainer}>
                <div className={s.container}>
                    <Logo />
                    <div className={s.textContainer}>
                        <h2>Memorise</h2>
                        <p>Одну секунду, призываем высшие силы.</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={s.mainContainer}>
            <Routes>
                <Route
                    path="/login"
                    element={user ? <Navigate to="/profile" /> : <Login setToken={setToken} />}
                />
                <Route
                    path="/generate"
                    element={<GenerateForm />}
                />
                <Route
                    path="/profile"
                    element={user ? <Profile setToken={setToken} /> : <Navigate to="/login" />}
                />
            </Routes>
        </div>
    )
}

export default App
