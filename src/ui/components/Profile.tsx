import s from "../styles/Styles.module.css"
import Logo from "./dumb/Logo.tsx"
import CustomButton from "./dumb/CustomButton.tsx"
import type {ProfileProps} from "../../bll/types.ts"
import CustomTextField from "./dumb/CustomTextField.tsx"
import {useProfileLogic} from "../../bll/hooks/useProfileLogic.ts";

function Profile({setUser, user, setError}: ProfileProps) {

    const {activeNameInput, setActiveNameInput,
        passwordValue, setPasswordValue,
        usernameValue, setUsernameValue,
        handleUpdateUsername, sendChangeUsername,
        handleLogout, handleDelete, sendDeleteUser
    } = useProfileLogic({setUser, setError})

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
                                   void sendChangeUsername()
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
                                       setActiveNameInput("")
                                       void sendDeleteUser()
                                   }}

                />}
        </div>
    )
}

export default Profile;
