import { useLocation, useNavigate } from "react-router-dom";

function formatTravelTime(hours) {
    if (!Number.isFinite(hours) || hours <= 0) return null;
    if (hours < 1) return `${Math.round(hours * 60)} min`;
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    if (minutes === 0) return `${wholeHours} hr${wholeHours === 1 ? "" : "s"}`;
    return `${wholeHours} hr${wholeHours === 1 ? "" : "s"} ${minutes} min`;
}

export default function Trip() {
    const location = useLocation();
    const navigate = useNavigate();

    const trip = location.state?.trip;

    if (!trip) {
        return (
            <div className="min-h-screen bg-[#071126] text-white px-6 py-10">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">No Trip Found</h1>
                    <p className="text-gray-400 mb-8">Generate a trip from the planner first.</p>
                    <button
                        onClick={() => navigate("/planner")}
                        className="bg-cyan-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-cyan-400 transition"
                    >
                        Go to Planner →
                    </button>
                </div>
            </div>
        );
    }

    const source = trip.source || "Not specified";
    const destination = trip.destination || trip.trip_name?.replace(/ Trip$/, "") || "Your Trip";
    const dayCount = Array.isArray(trip.itinerary) ? trip.itinerary.length : 0;

    return (
        <div className="min-h-screen bg-[#071126] text-white px-6 py-10">
            <div className="max-w-5xl mx-auto">
                <p className="text-cyan-400 text-lg mb-2">🤖 Travel Intelligence</p>
                <h1 className="text-4xl font-bold mb-3">Your Travel Plan</h1>
                <p className="text-gray-400 mb-10">Your personalized trip has been generated.</p>

                <div className="bg-[#111b32] rounded-2xl p-8">
                    <h2 className="text-4xl font-bold mb-4">
                        {trip.trip_name || `${source} → ${destination} Trip`}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
                        <div className="bg-[#1b2942] rounded-xl p-4">
                            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">From</p>
                            <p className="text-lg font-semibold text-white">{source}</p>
                        </div>
                        <div className="bg-[#1b2942] rounded-xl p-4">
                            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">To</p>
                            <p className="text-lg font-semibold text-white">{destination}</p>
                        </div>
                        <div className="bg-[#1b2942] rounded-xl p-4">
                            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Days</p>
                            <p className="text-lg font-semibold text-white">{dayCount || trip.days || 0}</p>
                        </div>
                        <div className="bg-[#1b2942] rounded-xl p-4">
                            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Estimated Cost</p>
                            <p className="text-lg font-semibold text-white">Rs. {trip.estimated_cost}</p>
                        </div>
                    </div>

                    {trip.budget && (
                        <p className="text-gray-300 mb-2">
                            <span className="text-cyan-400 font-semibold">Budget:</span>{" "}
                            Rs. {trip.budget}
                        </p>
                    )}

                    {trip.transport && (
                        <p className="text-gray-300 mb-6">
                            <span className="text-cyan-400 font-semibold">Transport:</span>{" "}
                            {trip.transport}
                        </p>
                    )}

                    <div className="border-t border-gray-600 pt-6 mt-6">
                        <h3 className="text-2xl font-bold mb-4">Generated Itinerary</h3>

                        {Array.isArray(trip.itinerary) ? (
                            <div className="space-y-4">
                                {trip.itinerary.map((day, index) => (
                                    <div key={index} className="bg-[#1b2942] rounded-xl p-5">
                                        <h4 className="text-xl font-bold mb-2">Day {index + 1}</h4>

                                        {day && typeof day === "object" && Array.isArray(day.places) && day.places.length > 0 && (
                                            <div className="mb-4">
                                                <p className="text-sm text-cyan-400 font-semibold mb-2">Places</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {day.places.map((place) => (
                                                        <span
                                                            key={place}
                                                            className="bg-[#071126] text-white text-sm px-3 py-1 rounded-full border border-gray-600"
                                                        >
                                                            {place}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {day && typeof day === "object" && Number.isFinite(day.route_distance_km) && day.route_distance_km > 0 && (
                                            <div className="mb-4 rounded-lg border border-cyan-400/30 bg-[#071126] p-4">
                                                <p className="text-sm text-cyan-400 font-semibold mb-2">Route</p>
                                                <p className="text-gray-200">Route distance: {day.route_distance_km} km</p>
                                                {formatTravelTime(day.route_travel_time_hours) && (
                                                    <p className="text-gray-200">
                                                        Estimated travel time: {formatTravelTime(day.route_travel_time_hours)}
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        <p className="text-gray-300 whitespace-pre-line">
                                            {typeof day === "string"
                                                ? day
                                                : [day.morning, day.afternoon, day.evening, day.transport_note]
                                                    .filter(Boolean)
                                                    .join("\n")}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <pre className="bg-[#1b2942] rounded-xl p-5 text-gray-300 whitespace-pre-wrap overflow-x-auto">
                                {JSON.stringify(trip, null, 2)}
                            </pre>
                        )}
                    </div>

                    <button
                        onClick={() => navigate("/planner")}
                        className="mt-8 bg-cyan-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-cyan-400 transition"
                    >
                        Plan Another Trip →
                    </button>
                </div>
            </div>
        </div>
    );
}
