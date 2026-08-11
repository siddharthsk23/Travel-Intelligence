import { useEffect, useState } from "react";

import AIBootScreen from "./AIBootScreen";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import QuestionCard from "./QuestionCard";
import RecommendationScreen from "./RecommendationScreen";

import { getRecommendations } from "../../ai/engine/recommendationEngine";
import { buildProfile } from "../../ai/engine/profileEngine";

import {
    travelerProfileFlow,
    tripFlow
} from "../../ai/data/conversationFlow";

const API_BASE = "http://127.0.0.1:8000";

export default function ChatWindow() {

    const [stage, setStage] = useState("loading");

    const [isReturningUser, setIsReturningUser] =
        useState(false);

    const [currentQuestion, setCurrentQuestion] =
        useState(0);

    const [selectedAnswer, setSelectedAnswer] =
        useState(null);

    const [typing, setTyping] =
        useState(false);

    const [aiMessage, setAiMessage] =
        useState("");

    const [answers, setAnswers] =
        useState({});

    const [tripAnswers, setTripAnswers] =
        useState({});

    const [conversationHistory, setConversationHistory] =
        useState([]);

    const [travelerProfile, setTravelerProfile] =
        useState(null);

    const [travelerId, setTravelerId] =
        useState(null);

    const [recommendations, setRecommendations] =
        useState([]);

    const [profile, setProfile] =
        useState(null);

    const [showResults, setShowResults] =
        useState(false);


    const activeFlow =
        stage === "traveler-profile"
            ? travelerProfileFlow
            : tripFlow;

    const question =
        activeFlow[currentQuestion];


    /*
     * --------------------------------------------------
     * INITIALIZE TRAVELER
     * --------------------------------------------------
     */

    useEffect(() => {

    async function initializeTraveler() {

        let id = localStorage.getItem(
            "travel_intelligence_traveler_id"
        );

        /*
         * =========================================
         * NEW USER
         * =========================================
         */

        if (!id) {

            id = crypto.randomUUID();

            localStorage.setItem(
                "travel_intelligence_traveler_id",
                id
            );

            console.log(
                "NEW TRAVELER:",
                id
            );

            setTravelerId(id);

            setIsReturningUser(false);

            setStage("traveler-profile");

            return;
        }


        /*
         * =========================================
         * EXISTING TRAVELER
         * =========================================
         */

        setTravelerId(id);
        setIsReturningUser(true);

        console.log(
            "EXISTING TRAVELER:",
            id
        );


        try {

            const response = await fetch(
                `${API_BASE}/traveler-profile/${id}`
            );


            /*
             * No saved profile.
             * Treat as new/uninitialized traveler.
             */

            if (response.status === 404) {

                console.log(
                    "NO SAVED PROFILE"
                );

                setTravelerProfile(null);

                setIsReturningUser(false);

                return;
            }


            if (!response.ok) {

                throw new Error(
                    `Profile request failed: ${response.status}`
                );

            }


            const data =
                await response.json();


            console.log(
                "RETURNING TRAVELER:",
                data
            );


            setTravelerProfile(data);

            setIsReturningUser(true);


        } catch (error) {

            console.error(
                "PROFILE LOAD ERROR:",
                error
            );

            /*
             * Don't block the user if profile
             * loading fails.
             */

            setTravelerProfile(null);

            setIsReturningUser(false);

        }

    }


    initializeTraveler();

}, []);


    /*
     * --------------------------------------------------
     * CURRENT QUESTION
     * --------------------------------------------------
     */


    /*
     * --------------------------------------------------
     * SAVE PERSISTENT TRAVELER PROFILE
     * --------------------------------------------------
     */

    async function saveTravelerProfile(
        profileAnswers
    ) {

        if (!travelerId) {

            console.error(
                "TRAVELER ID MISSING"
            );

            return null;
        }


        /*
         * Convert text input such as:
         *
         * "Peanuts, shellfish"
         *
         * into:
         *
         * ["Peanuts", "shellfish"]
         */

        function parseList(value) {

            if (!value) {
                return [];
            }


            if (
                value.trim().toLowerCase() ===
                "none"
            ) {

                return [];

            }


            return value
                .split(",")
                .map(item => item.trim())
                .filter(Boolean);

        }


        const persistentProfile = {

            traveler_id: travelerId,

            travel_style:
                profileAnswers.style || null,

            preferred_pace:
                profileAnswers.pace || null,

            interests:
                profileAnswers.interests
                    ? [profileAnswers.interests]
                    : [],

            transport_preference:
                profileAnswers.transport || null,

            food_preferences:
                profileAnswers.food
                    ? [profileAnswers.food]
                    : [],

            allergies:
                parseList(
                    profileAnswers.allergies
                ),

            phobias:
                parseList(
                    profileAnswers.phobias
                )

        };


        console.log(
            "SAVING TRAVELER PROFILE:",
            persistentProfile
        );


        try {

            const response = await fetch(
                `${API_BASE}/traveler-profile`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(
                        persistentProfile
                    )
                }
            );


            if (!response.ok) {

                const errorBody =
                    await response.text();

                console.error(
                    "PROFILE SAVE BACKEND ERROR:",
                    response.status,
                    errorBody
                );

                throw new Error(
                    `Profile save failed: ${response.status} - ${errorBody}`
                );

            }


            const savedProfile =
                await response.json();


            console.log(
                "TRAVELER PROFILE SAVED:",
                savedProfile
            );


            setTravelerProfile(
                savedProfile
            );


            return savedProfile;


        } catch (error) {

            console.error(
                "PROFILE SAVE ERROR:",
                error
            );

            return null;

        }

    }


    /*
     * --------------------------------------------------
     * AI RESPONSE
     * --------------------------------------------------
     */

    async function getAIResponse(
        answer,
        currentProfile
    ) {

        const requestPayload = {

            profile: {
                ...currentProfile,

                traveler_id:
                    travelerId
            },

            safety_concerns:
                currentProfile?.allergies ||
                [],

            comfort_preferences:
                currentProfile?.phobias ||
                [],

            conversation_history:
                conversationHistory,

            current_question:
                question.question,

            current_answer:
                answer

        };


        /*
         * Log exactly what is being sent
         * to FastAPI.
         */
        console.log(
            "AI REQUEST PAYLOAD:",
            requestPayload
        );


        try {

            const response = await fetch(
                `${API_BASE}/ai/chat`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(
                        requestPayload
                    )

                }
            );


            /*
             * IMPORTANT:
             *
             * Read the backend response body when
             * an error occurs so we can see the
             * actual FastAPI/Pydantic error.
             */
            if (!response.ok) {

                const errorBody =
                    await response.text();


                console.error(
                    "AI BACKEND ERROR:",
                    response.status,
                    errorBody
                );


                throw new Error(
                    `AI request failed: ${response.status} - ${errorBody}`
                );

            }


            const data =
                await response.json();


            const aiResponse =
                data.message;


            console.log(
                "AI RESPONSE:",
                aiResponse
            );


            setAiMessage(
                aiResponse
            );


            setConversationHistory(
                previous => [

                    ...previous,

                    {
                        role: "user",
                        content: answer
                    },

                    {
                        role: "assistant",
                        content: aiResponse
                    }

                ]
            );


        } catch (error) {

            console.error(
                "AI CHAT ERROR:",
                error
            );


            setAiMessage(
                "I'm having trouble connecting to the travel intelligence service. Please try again."
            );

        }

    }


    /*
     * --------------------------------------------------
     * HANDLE ANSWER
     * --------------------------------------------------
     */

    async function handleAnswer(answer) {

        setSelectedAnswer(answer);

        setTyping(true);

        setAiMessage("");


        /*
         * ==============================================
         * TRAVELER PROFILE STAGE
         * ==============================================
         */

        if (
            stage ===
            "traveler-profile"
        ) {

            const updatedProfileAnswers = {

                ...answers,

                [question.id]:
                    answer

            };


            setAnswers(
                updatedProfileAnswers
            );


            /*
             * Let the AI react to the answer.
             */
            await getAIResponse(
                answer,
                updatedProfileAnswers
            );


            const nextQuestion =
                currentQuestion + 1;


            /*
             * More profile questions remain.
             */
            if (
                nextQuestion <
                travelerProfileFlow.length
            ) {

                setTimeout(() => {

                    setCurrentQuestion(
                        nextQuestion
                    );

                    setSelectedAnswer(
                        null
                    );

                    setAiMessage(
                        ""
                    );

                }, 2500);


                setTyping(false);

                return;

            }


            /*
             * ==========================================
             * PROFILE COMPLETE
             * ==========================================
             */

            await saveTravelerProfile(
                updatedProfileAnswers
            );


            setTyping(false);


            /*
             * Move into the current-trip flow.
             */
            setTimeout(() => {

                setStage("trip");

                setCurrentQuestion(0);

                setAnswers({});

                setSelectedAnswer(
                    null
                );

                setAiMessage(
                    "I've got your travel preferences. Now let's plan your trip."
                );

            }, 2500);


            return;

        }


        /*
         * ==============================================
         * TRIP STAGE
         * ==============================================
         */

        const updatedTripAnswers = {

            ...tripAnswers,

            [question.id]:
                answer

        };


        setTripAnswers(
            updatedTripAnswers
        );


        /*
         * Combine persistent traveler preferences
         * with current trip preferences for the AI.
         */
        const aiProfile = {

            ...travelerProfile,

            destination:
                updatedTripAnswers.destinationName ||
                null,

            priority:
                updatedTripAnswers.priority ||
                null,

            mustHave:
                updatedTripAnswers.mustHave ||
                null

        };


        await getAIResponse(
            answer,
            aiProfile
        );


        /*
         * Handle "Surprise me."
         */
        let nextQuestion =
            currentQuestion + 1;


        if (
            question.id ===
            "destination" &&
            answer ===
            "Surprise me."
        ) {

            /*
             * Skip destinationName.
             */
            nextQuestion =
                currentQuestion + 2;

        }


        /*
         * More trip questions.
         */
        if (
            nextQuestion <
            tripFlow.length
        ) {

            setTimeout(() => {

                setCurrentQuestion(
                    nextQuestion
                );

                setSelectedAnswer(
                    null
                );

                setAiMessage(
                    ""
                );

            }, 2500);


            setTyping(false);

            return;

        }


        /*
         * ==========================================
         * TRIP COMPLETE
         * ==========================================
         */

        /*
         * The recommendation engine expects:
         *
         * travelStyle
         * tripPace
         * priority
         * mustHave
         *
         * Combine persistent preferences
         * with current trip answers.
         */

        const recommendationInput = {

            ...updatedTripAnswers,

            style:
                travelerProfile?.travel_style ||
                null,

            pace:
                travelerProfile?.preferred_pace ||
                null

        };


        const builtProfile =
            buildProfile(
                recommendationInput
            );


        /*
         * Add destination explicitly.
         */
        builtProfile.destination =
            updatedTripAnswers.destinationName ||
            null;


        console.log(
            "FINAL TRAVELER PROFILE:",
            travelerProfile
        );


        console.log(
            "FINAL TRIP PROFILE:",
            builtProfile
        );


        const finalRecommendations =
            getRecommendations(
                builtProfile
            );


        console.log(
            "FINAL RECOMMENDATIONS:",
            finalRecommendations
        );


        setProfile(
            builtProfile
        );


        setRecommendations(
            finalRecommendations
        );


        setTyping(false);


        setTimeout(() => {

            setStage(
                "results"
            );

        }, 2500);

    }


    /*
     * --------------------------------------------------
     * LOADING
     * --------------------------------------------------
     */

    if (stage === "loading") {

    return (

        <AIBootScreen
            isReturningUser={isReturningUser}
            onComplete={() => {

            setCurrentQuestion(0);
            setSelectedAnswer(null);
            setAiMessage("");

            if (isReturningUser) {
                setStage("trip");
            } else {
                setStage("traveler-profile");
            }

}}
        />

    );
}


    /*
     * --------------------------------------------------
     * RESULTS
     * --------------------------------------------------
     */

    if (stage === "results") {
    return (
        <RecommendationScreen
            profile={profile}
            recommendations={recommendations}
        />
    );
}


    /*
     * --------------------------------------------------
     * MAIN UI
     * --------------------------------------------------
     */

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