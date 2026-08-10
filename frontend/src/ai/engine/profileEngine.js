export function buildProfile(answers) {

    const destinationKnown =
        answers.destination ===
        "Yes, I know where I want to go.";

    return {

        destinationKnown,

        destination:
            answers.destinationName || null,

        travelStyle:
            answers.style || null,

        tripPace:
            answers.pace || null,

        priority:
            answers.priority || null,

        mustHave:
            answers.mustHave || null

    };

}