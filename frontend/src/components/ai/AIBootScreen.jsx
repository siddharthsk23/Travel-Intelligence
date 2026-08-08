import { useEffect, useState } from "react";

const bootSteps = [
  "Connecting to Travel Intelligence...",
  "Loading destination knowledge...",
  "Learning your travel profile...",
  "Preparing AI assistant...",
  "Connection established."
];

export default function AIBootScreen({ onComplete }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= bootSteps.length - 1) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1200);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 1200);

    return () => clearTimeout(timer);
  }, [step, onComplete]);

  return (
    <div className="fixed inset-0 bg-[#020817] flex items-center justify-center">

      <div className="text-center">

        <div className="text-6xl mb-6">
            🌍
        </div>

        <h1 className="text-4xl font-bold text-white mb-8">
            Travel Intelligence
        </h1>

        <div className="space-y-4">

            {bootSteps.map((message,index)=>(

                <div
                    key={index}
                    className={`transition-all duration-700 ${
                        index<=step
                        ? "text-cyan-400"
                        : "text-slate-600"
                    }`}
                >

                    {index<=step?"✔ ":"○ "}
                    {message}

                </div>

            ))}

        </div>

      </div>

    </div>
  );
}