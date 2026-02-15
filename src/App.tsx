import {Route, Routes} from "react-router-dom";
import s from './ui/styles/Styles.module.css'
import Login from "./ui/components/Login.tsx";
import GenerateForm from "./ui/components/GenerateForm.tsx";
import {useEffect, useState} from "react";
import Profile from "./ui/components/Profile.tsx";

function App() {

    const [user, setUser] = useState<string | null>(null)

    function setToken(token: string) {
        setUser(token)
    }

    useEffect(() => {
        const res = fetch( 'https://dev-api.memorise.cards/api/auth/profile', {
            method: 'GET',
        })
        console.log(res)
    },[])

    return (
        <div className={s.mainContainer}>
            <Routes>
                <Route path="/login" element={<Login setToken={setToken}/>} />
                <Route path="/generate" element={<GenerateForm />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    )

}

export default App
