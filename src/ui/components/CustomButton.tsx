function CustomButton({onClick}: {onClick?: () => void}) {
    return (
        <button onClick={onClick}>Продолжить</button>
    )
}

export default CustomButton;
