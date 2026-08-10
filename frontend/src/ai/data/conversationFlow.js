const conversationFlow = [

    {
        id: "destination",
        question: "Do you already have a destination in mind?",
        options: [
            "Yes, I know where I want to go.",
            "Surprise me."
        ]
    },

    {
        id: "destinationName",
        question: "Where would you like to go?",
        type: "text",
        placeholder: "Enter a destination..."
    },

    {
        id: "style",
        question: "What kind of traveler are you?",
        options: [
            "Adventure",
            "Luxury",
            "Nature",
            "History",
            "Photography",
            "Food",
            "Road Trip"
        ]
    },

    {
        id: "pace",
        question: "How busy do you want your trip to be?",
        options: [
            "Relaxed",
            "Balanced",
            "Packed"
        ]
    },

    {
        id: "priority",
        question: "What matters the most?",
        options: [
            "Budget",
            "Experience",
            "Luxury",
            "Local Culture"
        ]
    },

    {
        id: "mustHave",
        question: "What's one thing you definitely don't want to miss?",
        options: [
            "Sunrise",
            "Sunset",
            "Wildlife",
            "Local Food",
            "Roads",
            "Nightlife"
        ]
    }

];

export default conversationFlow;