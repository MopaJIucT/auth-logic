import s from "../styles/Styles.module.css";
import Logo from "./Logo.tsx";

function Profile() {
    return (
        <div className={s.container}>
            <Logo />
            <p>Имя:</p>
        </div>
    )
}

export default Profile;
