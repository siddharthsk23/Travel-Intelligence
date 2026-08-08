function SelectionCard({
  icon,
  title,
  subtitle,
  selected,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        rounded-2xl
        border
        p-5
        transition-all
        duration-300
        text-left

        ${
          selected
            ? "bg-cyan-600 border-cyan-400 shadow-lg shadow-cyan-500/30 scale-105"
            : "bg-slate-800 border-slate-700 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1"
        }
      `}
    >
      <div className="text-3xl mb-3">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="text-sm text-slate-400 mt-1">
        {subtitle}
      </p>
    </button>
  );
}

export default SelectionCard;
