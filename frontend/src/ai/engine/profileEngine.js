export function buildTravelProfile(answers) {

    return {

        destinationMode: answers.destination,

        travelStyle: answers.style,

        mustHave: answers.mustHave,

        tripPace: answers.pace,

        priority: answers.priority,

        confidence: calculateConfidence(answers)

    };

}

function calculateConfidence(answers) {

    const answered = Object.values(answers).filter(Boolean).length;

    return answered / 5;

}