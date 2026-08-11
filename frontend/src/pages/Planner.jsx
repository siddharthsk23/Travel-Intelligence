import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PlannerContext } from "../PlannerContext";

export default function Planner() {
    const {
        source,
        setSource,
        destination,
        setDestination,
        days,
        setDays,
        budget,
        setBudget,
        transport,
        setTransport,
        interests,
        setInterests,
    } = useContext(PlannerContext);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.destination) {
            setDestination(location.state.destination);
        }
    }, [location.state, setDestination]);

    const toggleInterest = (interest) => {
        if (interests.includes(interest)) {
            setInterests(interests.filter((item) => item !== interest));
        } else {
            setInterests([...interests, interest]);
        }
    };

    const generateTrip = async () => {
        try {
            const trimmedSource = source.trim();
            const trimmedDestination = destination.trim();
            const safeDays = Number(days);
            const safeBudget = Number(budget);

            if (!trimmedSource) {
                alert("Please enter a starting location.");
                return;
            }

            if (!trimmedDestination) {
                alert("Please enter a destination.");
                return;
            }

            if (!Number.isFinite(safeDays) || safeDays < 1 || safeDays > 30) {
                alert("Please enter a valid number of days.");
                return;
            }

            if (!Number.isFinite(safeBudget) || safeBudget < 0) {
                alert("Please enter a valid budget.");
                return;
            }

            if (!transport) {
                alert("Please select a preferred transport.");
                return;
            }

            const response = await fetch(
                "http://localhost:8000/planner/generate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        source: trimmedSource,
                        destination: trimmedDestination,
                        days: safeDays,
                        budget: safeBudget,
                        transport,
                        interests,
                    }),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Backend error ${response.status}: ${errorText}`);
            }

            const data = await response.json();

            navigate("/trip", {
                state: {
                    trip: data,
                },
            });
        } catch (error) {
            console.error("TRIP GENERATION ERROR:", error);
            alert(`Unable to generate trip: ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#071126] text-white px-6 py-10">
            <div className="max-w-5xl mx-auto">
                <p className="text-cyan-400 text-lg mb-2">🤖 Travel Intelligence</p>

                <h1 className="text-4xl font-bold mb-3">Plan Your Trip</h1>

                <p className="text-gray-400 mb-10">
                    Let's turn your journey into a complete travel plan.
                </p>

                <div className="bg-[#111b32] rounded-2xl p-8 space-y-8">
                    {/* Starting location */}
                    <div>
                        <label className="block text-xl font-semibold mb-3">
                            Starting location
                        </label>
                        <p className="text-gray-400 mb-3">
                            Where are you starting your journey from?
                        </p>
                        <input
                            type="text"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            placeholder="e.g. Bengaluru"
                            className="w-full bg-[#1b2942] border border-gray-600 rounded-xl px-5 py-4 text-white outline-none focus:border-cyan-400"
                        />
                    </div>

                    {/* Destination */}
                    <div>
                        <label className="block text-xl font-semibold mb-3">
                            Your destination
                        </label>
                        <p className="text-gray-400 mb-3">
                            Enter your destination, or use the Travel Intelligence recommendation.
                        </p>
                        <input
                            type="text"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            placeholder="Your destination"
                            className="w-full bg-[#1b2942] border border-gray-600 rounded-xl px-5 py-4 text-white outline-none focus:border-cyan-400"
                        />
                    </div>

                    {/* Days */}
                    <div>
                        <label className="block text-xl font-semibold mb-3">How many days?</label>
                        <input
                            type="number"
                            min="1"
                            max="30"
                            value={days}
                            onChange={(e) => setDays(Number(e.target.value))}
                            className="w-full bg-[#1b2942] border border-gray-600 rounded-xl px-5 py-4 text-white outline-none focus:border-cyan-400"
                        />
                    </div>

                    {/* Budget */}
                    <div>
                        <label className="block text-xl font-semibold mb-3">What's your budget?</label>
                        <input
                            type="number"
                            min="0"
                            value={budget}
                            onChange={(e) => setBudget(Number(e.target.value))}
                            className="w-full bg-[#1b2942] border border-gray-600 rounded-xl px-5 py-4 text-white outline-none focus:border-cyan-400"
                        />
                    </div>

                    {/* Transport */}
                    <div>
                        <label className="block text-xl font-semibold mb-3">Preferred transport</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {["Bike", "Car", "Public Transport"].map((option) => (
                                <button
                                    type="button"
                                    key={option}
                                    onClick={() => setTransport(option)}
                                    className={`px-5 py-4 rounded-xl font-semibold transition ${
                                        transport === option
                                            ? "bg-cyan-500 text-black"
                                            : "bg-[#1b2942] hover:bg-[#263752]"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Interests */}
                    <div>
                        <label className="block text-xl font-semibold mb-3">What interests you?</label>
                        <div className="flex flex-wrap gap-3">
                            {["Adventure", "Nature", "History", "Photography", "Food", "Road Trips", "Nightlife"].map((interest) => (
                                <button
                                    type="button"
                                    key={interest}
                                    onClick={() => toggleInterest(interest)}
                                    className={`px-5 py-3 rounded-full transition ${
                                        interests.includes(interest)
                                            ? "bg-cyan-500 text-black"
                                            : "bg-[#1b2942] hover:bg-[#263752]"
                                    }`}
                                >
                                    {interest}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={generateTrip}
                        className="w-full bg-cyan-500 text-black py-4 rounded-xl font-bold text-lg hover:bg-cyan-400 transition"
                    >
                        Generate My Trip →
                    </button>
                </div>
            </div>
        </div>
    );
}
