import { useState } from "react";
import OptionButton from "./OptionButton";

export default function QuestionCard({
    question,
    selected,
    onSelect
}) {

    const [text, setText] = useState("");

    function handleSubmit() {

        const value = text.trim();

        if (!value) {
            return;
        }

        onSelect(value);
        setText("");

    }

    return (

        <div className="bg-slate-900 rounded-2xl p-8 shadow-2xl">

            <h2 className="text-3xl font-bold text-white mb-8">
                {question.question}
            </h2>

            {question.type === "text" ? (

                <div className="flex flex-col gap-4">

                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit();
                            }
                        }}
                        placeholder={question.placeholder}
                        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white text-lg outline-none focus:border-cyan-400"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={!text.trim()}
                        className="rounded-xl bg-cyan-500 px-5 py-4 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Continue →
                    </button>

                </div>

            ) : (

                <div className="grid gap-4">

                    {question.options.map((option) => (

                        <OptionButton
                            key={option}
                            text={option}
                            selected={selected === option}
                            onClick={() => onSelect(option)}
                        />

                    ))}

                </div>

            )}

        </div>

    );
}