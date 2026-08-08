function ConversationProgress({

    current,

    total

}) {

    const percentage = (current / total) * 100;

    return (

        <div className="mb-10">

            <div className="flex justify-between text-sm text-slate-400 mb-2">

                <span>

                    Question {current} of {total}

                </span>

                <span>

                    {Math.round(percentage)}%

                </span>

            </div>

            <div className="w-full h-2 bg-slate-700 rounded-full">

                <div

                    className="h-full bg-cyan-400 rounded-full transition-all duration-500"

                    style={{ width: `${percentage}%` }}

                />

            </div>

        </div>

    );
}

export default ConversationProgress;
