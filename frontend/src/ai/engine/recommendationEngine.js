import destinations from "../data/destinations";

export function getRecommendations(profile) {

    console.log(
        "RECOMMENDATION ENGINE PROFILE:",
        profile
    );

    /*
     * If the user explicitly selected a destination,
     * do NOT recommend a different destination.
     */

    if (profile.destinationKnown && profile.destination) {

        const requestedDestination =
            profile.destination.trim().toLowerCase();

        const exactMatch = destinations.find(
            (destination) =>
                destination.name.trim().toLowerCase() ===
                requestedDestination
        );

        if (exactMatch) {

            return [
                {
                    ...exactMatch,
                    score: 100,
                    confidence: 100
                }
            ];

        }

        /*
         * Destination isn't in our curated database.
         *
         * Return a placeholder so the backend AI can
         * still personalize the requested destination.
         */

        return [
            {
                name: profile.destination,
                country: "Unknown",
                tags: [],
                score: 100,
                confidence: 100,
                requestedDestination: true
            }
        ];

    }

    /*
     * No destination specified.
     * This is the normal recommendation flow.
     */

    const scored = destinations.map((destination) => {

        let score = 0;

        destination.tags.forEach((tag) => {

            if (tag === profile.travelStyle) {
                score += 4;
            }

            if (tag === profile.mustHave) {
                score += 3;
            }

            if (tag === profile.priority) {
                score += 3;
            }

            if (tag === profile.tripPace) {
                score += 1;
            }

        });

        console.log(
            destination.name,
            "=>",
            score
        );

        return {
            ...destination,
            score
        };

    });

    scored.sort(
        (a, b) => b.score - a.score
    );

    const maxScore = Math.max(
        ...scored.map(
            destination => destination.score
        ),
        1
    );

    const recommendations = scored
        .slice(0, 3)
        .map((destination) => {

            const confidence = Math.round(
                (destination.score / maxScore) * 100
            );

            return {
                ...destination,
                confidence
            };

        });

    console.log(
        "FINAL RECOMMENDATIONS:",
        recommendations
    );

    return recommendations;

}