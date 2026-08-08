import Button from "../common/Button";

function RecommendationCard({
    destination,
    description,
    rating,
    bestTime,
    estimatedCost,
    image,
}) {
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg overflow-hidden hover:border-cyan-400 transition-all duration-300">

            {/* Destination Image */}
            <img
                src={image}
                alt={destination}
                className="w-full h-64 object-cover"
            />

            {/* Content */}
            <div className="p-6">

                {/* Title */}
                <h2 className="text-3xl font-bold text-white">
                    {destination}
                </h2>

                {/* Description */}
                <p className="text-slate-400 mt-3 leading-relaxed">
                    {description}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 mt-6">

                    <div className="bg-slate-700 rounded-xl p-4">
                        <p className="text-sm text-slate-400">
                            ⭐ Rating
                        </p>
                        <h3 className="text-xl font-semibold text-cyan-400">
                            {rating}/5
                        </h3>
                    </div>

                    <div className="bg-slate-700 rounded-xl p-4">
                        <p className="text-sm text-slate-400">
                            📅 Best Time
                        </p>
                        <h3 className="text-lg font-semibold text-white">
                            {bestTime}
                        </h3>
                    </div>

                    <div className="bg-slate-700 rounded-xl p-4 col-span-2">
                        <p className="text-sm text-slate-400">
                            💰 Estimated Budget
                        </p>
                        <h3 className="text-2xl font-bold text-cyan-400">
                            {estimatedCost}
                        </h3>
                    </div>

                </div>

                {/* Button */}
                <div className="mt-8">
                    <Button>
                        View Complete Itinerary
                    </Button>
                </div>

            </div>

        </div>
    );
}

export default RecommendationCard;