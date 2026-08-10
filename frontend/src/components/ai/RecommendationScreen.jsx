export default function RecommendationScreen({
    profile,
    recommendations
}) {

    const top = recommendations[0];

    if (!top) {
        return (
            <div className="max-w-5xl mx-auto py-10 px-6 text-white">
                <h1 className="text-3xl font-bold">
                    No recommendations found
                </h1>
            </div>
        );
    }

    return (

        <div className="max-w-5xl mx-auto py-10 px-6 text-white">

            <p className="text-cyan-400 text-lg mb-2">
                🤖 Travel Intelligence
            </p>

            <h1 className="text-4xl font-bold mb-3">
                Your Perfect Destination
            </h1>

            <p className="text-gray-400 mb-8">
                Based on your travel personality, I've found the best
                destination for you.
            </p>

            <div className="bg-[#1b263b] rounded-2xl p-8">

                <div className="bg-cyan-500 text-black px-4 py-3 rounded-full font-bold text-lg">
                    🏆 TOP MATCH
                </div>

                <div className="bg-[#164e63] text-cyan-300 px-4 py-3 rounded-full font-bold text-xl mt-3">
                    {top.confidence}% Confidence
                </div>

                <h2 className="text-5xl font-bold mt-6">
                    {top.name}
                </h2>

                <p className="text-gray-400 mb-6">
                    {top.country}
                </p>

                <div className="flex gap-3 flex-wrap">

                    {top.tags.map((tag) => (

                        <span
                            key={tag}
                            className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full"
                        >
                            {tag}
                        </span>

                    ))}

                </div>

                <div className="border-t border-gray-600 mt-8 pt-8">

                    <h3 className="text-2xl font-bold mb-5">
                        Why this destination?
                    </h3>

                    <div className="space-y-4 text-gray-300">

                        {profile.priority && (
                            <p>
                                <span className="text-cyan-400">✓</span>{" "}
                                Fits your preference for{" "}
                                <span className="text-cyan-400 font-semibold">
                                    {profile.priority}
                                </span>.
                            </p>
                        )}

                        {profile.tripPace && (
                            <p>
                                <span className="text-cyan-400">✓</span>{" "}
                                Suitable for a{" "}
                                <span className="text-cyan-400 font-semibold">
                                    {profile.tripPace.toLowerCase()}
                                </span>{" "}
                                travel pace.
                            </p>
                        )}

                        {profile.travelStyle && (
                            <p>
                                <span className="text-cyan-400">✓</span>{" "}
                                Matches your{" "}
                                <span className="text-cyan-400 font-semibold">
                                    {profile.travelStyle}
                                </span>{" "}
                                travel style.
                            </p>
                        )}

                    </div>

                    <button
                        className="mt-8 bg-cyan-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-cyan-400 transition"
                    >
                        Continue Planning →
                    </button>

                </div>

            </div>

        </div>

    );
}