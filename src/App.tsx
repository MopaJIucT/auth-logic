import {Navigate, Route, Routes} from "react-router-dom"
import s from './ui/styles/Styles.module.css'
import Login from "./ui/components/Login.tsx"
import GenerateForm from "./ui/components/GenerateForm.tsx"
import {useEffect, useState} from "react"
import Profile from "./ui/components/Profile.tsx"
import {getProfile} from "./dal/api.ts"
import type {ProfileResponse} from "./bll/types.ts"
import Loader from "./ui/components/Loader.tsx"

function App() {

    const [user, setUser] = useState<ProfileResponse | null>(null)
    const [loader, setLoader] = useState<boolean>(true)
    const [onSubmit, setSubmit] = useState<boolean>(false)

    function handleSetLoader() {
        setLoader(false)
    }

    useEffect(() => {
        if ((localStorage.getItem('token') ?? '').length > 0) {
            const res = getProfile()
            res.then((user) => {
                setUser(user)
                setSubmit(true)
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
                        element={onSubmit
                            ? <Navigate to="/profile"/>
                            : <Login setSubmit={setSubmit} setUser={setUser}/>}
                    />
                    <Route
                        path="/generate"
                        element={<GenerateForm/>}
                    />
                    <Route
                        path="/profile"
                        element={onSubmit ?
                            <Profile setUser={setUser}
                                     user={user}
                                     setSubmit={setSubmit}
                            /> : <Navigate to="/login"/>}
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
