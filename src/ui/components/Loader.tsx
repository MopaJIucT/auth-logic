import s from "../styles/Styles.module.css";
import Logo from "./Logo.tsx";

function Loader() {
    return (
        <div className={s.container}>
            <Logo/>
            <div className={s.textContainer}>
                <h2>Memorise</h2>
                <p>Одну секунду, призываем высшие силы.</p>
            </div>
        </div>
    )
}

export default Loader;