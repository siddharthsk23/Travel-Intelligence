import OptionButton from "./OptionButton";

export default function QuestionCard({
  question,
  selected,
  onSelect
}) {

    return (

        <div className="bg-slate-900 rounded-2xl p-8 shadow-2xl">

            <h2 className="text-3xl font-bold text-white mb-8">
                {question.question}
            </h2>
            
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

        </div>

    );

}