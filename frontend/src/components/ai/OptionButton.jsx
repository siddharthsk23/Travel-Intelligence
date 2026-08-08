export default function OptionButton({
  text,
  selected,
  onClick
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-5 rounded-xl transition-all duration-300
      ${
        selected
          ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
          : "bg-slate-800 hover:bg-cyan-600 text-white"
      }`}
    >
      {text}
    </button>
  );
}