import { useState } from "react";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import { getRecommendations } from "../../ai/engine/recommendationEngine";
import conversationFlow from "../../ai/data/conversationFlow";
import QuestionCard from "./QuestionCard";
import { buildProfile } from "../../ai/engine/profileEngine";
import RecommendationScreen from "./RecommendationScreen";

export default function ChatWindow() {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [typing, setTyping] = useState(false);
    const [aiMessage, setAiMessage] = useState("");
    const [answers, setAnswers] = useState({});
    const [conversationHistory, setConversationHistory] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [profile, setProfile] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const question = conversationFlow[currentQuestion];

    async function handleAnswer(answer) {

        setSelectedAnswer(answer);

        const finalAnswers = {
            ...answers,
            [question.id]: answer
        };

        setAnswers(finalAnswers);

        setTyping(true);
        setAiMessage("");

        const builtProfile = buildProfile(finalAnswers);

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/ai/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        profile: builtProfile,

                        safety_concerns: [],

                        comfort_preferences: [],

                        conversation_history: conversationHistory,

                        current_question: question.question,

                        current_answer: answer

                    })
                }
            );

            if (!response.ok) {

                throw new Error(
                    `AI request failed: ${response.status}`
                );

            }

            const data = await response.json();

            const aiResponse = data.message;

            setAiMessage(aiResponse);

            setConversationHistory(prev => [

                ...prev,

                {
                    role: "user",
                    content: answer
                },

                {
                    role: "assistant",
                    content: aiResponse
                }

            ]);

        } catch (error) {

            console.error(
                "AI CHAT ERROR:",
                error
            );

            setAiMessage(
                "I'm having trouble connecting to the travel intelligence service. Please try again."
            );

        } finally {

            setTyping(false);

        }

        /*
         * Determine the next question.
         */

        let nextQuestion = currentQuestion + 1;

        /*
         * If the user chose "Surprise me",
         * skip the destination text input.
         *
         * destination
         *     ↓
         * Surprise me
         *     ↓
         * style
         */

        if (
            question.id === "destination" &&
            answer === "Surprise me."
        ) {

            nextQuestion = currentQuestion + 2;

        }

        /*
         * Continue to the next question.
         */

        if (nextQuestion < conversationFlow.length) {

            setTimeout(() => {

                setCurrentQuestion(nextQuestion);

                setSelectedAnswer(null);

                setAiMessage("");

            }, 3000);

        } else {

            /*
             * Final question completed.
             * Generate recommendations.
             */

            const finalRecommendations =
                getRecommendations(builtProfile);

            console.log(
                "FINAL PROFILE:",
                builtProfile
            );

            console.log(
                "FINAL RECOMMENDATIONS:",
                finalRecommendations
            );

            setProfile(builtProfile);

            setRecommendations(
                finalRecommendations
            );

            setTimeout(() => {

                setShowResults(true);

            }, 3000);

        }

    }

    if (showResults) {

        return (

            <RecommendationScreen
                profile={profile}
                recommendations={recommendations}
            />

        );

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