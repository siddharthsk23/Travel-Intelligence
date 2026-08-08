function Button({
    children,
    onClick,
    type = "button",
    className = "",
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;