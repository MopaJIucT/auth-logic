import {Navigate, Route, Routes} from "react-router-dom"
import s from './ui/styles/Styles.module.css'
import Login from "./ui/components/Login.tsx"
import GenerateForm from "./ui/components/GenerateForm/GenerateForm.tsx"
import Profile from "./ui/components/Profile.tsx"
import Loader from "./ui/components/dumb/Loader.tsx"
import RegisterForm from "./ui/components/GenerateForm/RegisterForm.tsx";
import Modal from "./ui/components/dumb/Modal.tsx"
import {useCheckUser} from "./bll/hooks/useCheckUser.ts";

function App() {

    const {user, setUser, newUser, setNewUser, loader, error, setError} = useCheckUser()

    return (
        <div className={s.mainContainer}>
            {loader
                ? <Loader/>
                : <Routes>
                    <Route
                        path="/login"
                        element={user
                            ? <Navigate to="/profile"/>
                            : <Login setUser={setUser}
                                     setError={setError}
                            />}
                    />
                    <Route
                        path="/generate"
                        element={<GenerateForm setNewUser={setNewUser}
                                               setError={setError}
                        />}
                    />
                    <Route
                        path="/profile"
                        element={user
                            ? <Profile setUser={setUser}
                                       user={user}
                                       setError={setError}
                            />
                            : <Navigate to="/login"/>}
                    />
                    <Route path="/register"
                           element={newUser
                               ? <RegisterForm verifyToken={newUser}
                                               setUser={setUser}
                                               setError={setError}
                               />
                               : <Navigate to="/generate"/>}
                    />
                    <Route
                        path="/*"
                        element={<Navigate to="/login"/>}
                    />
                </Routes>
            }
            {error && <Modal message={error}
                             onClose={() => setError("")}/>
            }
        </div>
    )
}

export default App
