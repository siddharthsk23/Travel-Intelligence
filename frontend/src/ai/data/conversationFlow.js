const travelerProfileFlow = [

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
        question: "What's your preferred travel pace?",
        options: [
            "Relaxed",
            "Balanced",
            "Packed"
        ]
    },

    {
        id: "interests",
        question: "What interests you the most while travelling?",
        options: [
            "Nature",
            "History",
            "Adventure",
            "Photography",
            "Food",
            "Road Trips",
            "Nightlife"
        ]
    },

    {
        id: "transport",
        question: "How do you usually prefer to travel?",
        options: [
            "My own car",
            "My own bike",
            "Public transport",
            "Flights",
            "Mix of transport"
        ]
    },

    {
        id: "food",
        question: "What are your food preferences?",
        options: [
            "No restrictions",
            "Vegetarian",
            "Vegan",
            "Jain",
            "Non-vegetarian",
            "Local food enthusiast"
        ]
    },

    {
        id: "allergies",
        question: "Do you have any food or other allergies I should know about?",
        type: "text",
        placeholder: "Type an allergy, or enter 'None'..."
    },

    {
        id: "phobias",
        question: "Are there any phobias, physical limitations, or experiences you want me to avoid?",
        type: "text",
        placeholder: "Type them here, or enter 'None'..."
    }

];


const tripFlow = [

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
        id: "priority",
        question: "What matters the most for this trip?",
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


export {
    travelerProfileFlow,
    tripFlow
};

export default tripFlow;