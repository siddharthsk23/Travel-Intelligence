import { useEffect, useState } from "react";

const newUserSteps = [
    "Connecting to Travel Intelligence...",
    "Creating your travel profile...",
    "Learning your travel preferences...",
    "Preparing your AI assistant...",
    "Connection established."
];

const returningUserSteps = [
    "Connecting to Travel Intelligence...",
    "Loading your saved travel profile...",
    "Restoring your travel preferences...",
    "Preparing your AI assistant...",
    "Welcome back."
];

export default function AIBootScreen({
    isReturningUser,
    onComplete
}) {
    const bootSteps = isReturningUser
        ? returningUserSteps
        : newUserSteps;

    const [step, setStep] = useState(0);

    useEffect(() => {
        setStep(0);
    }, [isReturningUser]);

    useEffect(() => {
        if (step >= bootSteps.length - 1) {
            const timer = setTimeout(() => {
                onComplete();
            }, 1000);

            return () => clearTimeout(timer);
        }

        const timer = setTimeout(() => {
            setStep((previous) => previous + 1);
        }, 900);

        return () => clearTimeout(timer);
    }, [step, bootSteps.length, onComplete]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="text-center">

                <div className="text-6xl mb-6">
                    🌍
                </div>

                <h1 className="text-4xl font-bold text-white mb-8">
                    Travel Intelligence
                </h1>

                <div className="space-y-4">

                    {bootSteps.map((message, index) => (
                        <div
                            key={message}
                            className={`transition-all duration-700 ${
                                index <= step
                                    ? "text-cyan-400"
                                    : "text-slate-600"
                            }`}
                        >
                            {index <= step ? "✔ " : "○ "}
                            {message}
                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
}