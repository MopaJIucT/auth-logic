import s from "../styles/Styles.module.css";
import Logo from "./Logo.tsx";
import CustomButton from "./CustomButton.tsx";
import type {ProfileProps} from "../../bll/types.ts";

function Profile({setToken}: ProfileProps) {
    function handleLogout() {
        localStorage.clear()
        setToken(null)
    }

    function handleDelete() {
        localStorage.clear()
        getDelete()
    }
    function getDelete() {}

    function handleUpdateUsername() {}

    return (
        <div className={s.container}>
            <Logo />
            <p>Имя:</p>
            <CustomButton onClick={handleUpdateUsername} value={"Изменить имя"}/>
            <CustomButton onClick={handleLogout} value={"выйти из аккаунта"}/>
            <CustomButton onClick={handleDelete} value={"удалить аккаунт"}/>
        </div>
    )
}

export default Profile;
