import { useState } from "react";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import { getRecommendations } from "../../ai/engine/recommendationEngine";
import aiResponses from "../../ai/data/aiResponses";
import conversationFlow from "../../ai/data/conversationFlow";
import QuestionCard from "./QuestionCard";

export default function ChatWindow() {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [typing, setTyping] = useState(false);
    const [aiMessage, setAiMessage] = useState("");
    const [answers, setAnswers] = useState({});
    const [recommendations, setRecommendations] = useState([]);

    const question = conversationFlow[currentQuestion];

    function handleAnswer(answer) {

        setSelectedAnswer(answer);

        const finalAnswers = {
            ...answers,
            [question.id]: answer
        };

        setAnswers(finalAnswers);

        setTyping(true);
        setAiMessage("");

        setTimeout(() => {

            setTyping(false);

            setAiMessage(
                aiResponses[question.id]?.[answer] ??
                "Interesting choice."
            );

        }, 1200);

        if (currentQuestion < conversationFlow.length - 1) {

            setTimeout(() => {

                setCurrentQuestion(prev => prev + 1);
                setSelectedAnswer(null);
                setAiMessage("");

            }, 2500);

        } else {

            console.log("Conversation Finished");
            const recommendations = getRecommendations(finalAnswers);

            setRecommendations(recommendations);

        }

    }

    return (

        <div className="max-w-5xl mx-auto space-y-6">

            <QuestionCard
                question={question}
                selected={selectedAnswer}
                onSelect={handleAnswer}
            />

            {typing && (
                <TypingIndicator />
            )}

            {aiMessage && (
                <ChatBubble
                    message={aiMessage}
                />
            )}

        </div>

    );

}