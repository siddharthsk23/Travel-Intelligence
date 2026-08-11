import { useContext, useEffect, useMemo, useState } from "react";
import { PlannerContext } from "../../PlannerContext";

const TRANSPORT_MODES = [
    "Bike",
    "Car",
    "Public Transport",
    "Flight",
];

const emptyVehicleDetails = {
    vehicle_model: "",
    mileage_kmpl: "",
    fuel_tank_liters: "",
    fuel_price_per_liter: "",
    riders: 1,
    pillion: false,
    luggage_kg: "",
};

export default function TransportIntelligence() {
    const { destination, transport } = useContext(PlannerContext);

    const initialMode = TRANSPORT_MODES.includes(transport)
        ? transport
        : "Bike";

    const [source, setSource] = useState("");
    const [distanceKm, setDistanceKm] = useState("");
    const [selectedMode, setSelectedMode] = useState(initialMode);
    const [vehicleDetails, setVehicleDetails] = useState(emptyVehicleDetails);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const needsVehicleDetails = selectedMode === "Bike" || selectedMode === "Car";

    useEffect(() => {
        if (TRANSPORT_MODES.includes(transport)) {
            setSelectedMode(transport);
        }
    }, [transport]);

    const requestPayload = useMemo(() => {
        const basePayload = {
            source: source.trim(),
            destination: destination.trim(),
            distance_km: Number(distanceKm),
            transport_modes: TRANSPORT_MODES,
            selected_mode: selectedMode,
            vehicle_model: null,
            mileage_kmpl: null,
            fuel_tank_liters: null,
            fuel_price_per_liter: null,
            riders: null,
            pillion: null,
            luggage_kg: null,
        };

        if (!needsVehicleDetails) {
            return basePayload;
        }

        return {
            ...basePayload,
            vehicle_model: vehicleDetails.vehicle_model.trim() || null,
            mileage_kmpl: Number(vehicleDetails.mileage_kmpl),
            fuel_tank_liters: Number(vehicleDetails.fuel_tank_liters),
            fuel_price_per_liter: Number(vehicleDetails.fuel_price_per_liter),
            riders: Number(vehicleDetails.riders),
            pillion: vehicleDetails.pillion,
            luggage_kg: vehicleDetails.luggage_kg === ""
                ? null
                : Number(vehicleDetails.luggage_kg),
        };
    }, [
        source,
        destination,
        distanceKm,
        selectedMode,
        needsVehicleDetails,
        vehicleDetails,
    ]);

    const updateVehicleField = (field, value) => {
        setVehicleDetails((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const validate = () => {
        if (!source.trim()) {
            return "Please enter a source.";
        }

        if (!destination.trim()) {
            return "Please select or enter a destination first.";
        }

        if (!Number.isFinite(Number(distanceKm)) || Number(distanceKm) <= 0) {
            return "Please enter a valid distance in kilometers.";
        }

        if (!needsVehicleDetails) {
            return "";
        }

        if (!vehicleDetails.vehicle_model.trim()) {
            return "Please enter a vehicle model.";
        }

        if (!Number.isFinite(Number(vehicleDetails.mileage_kmpl)) || Number(vehicleDetails.mileage_kmpl) <= 0) {
            return "Please enter valid mileage.";
        }

        if (!Number.isFinite(Number(vehicleDetails.fuel_tank_liters)) || Number(vehicleDetails.fuel_tank_liters) <= 0) {
            return "Please enter valid fuel tank capacity.";
        }

        if (!Number.isFinite(Number(vehicleDetails.fuel_price_per_liter)) || Number(vehicleDetails.fuel_price_per_liter) < 0) {
            return "Please enter a valid fuel price.";
        }

        if (!Number.isFinite(Number(vehicleDetails.riders)) || Number(vehicleDetails.riders) < 1) {
            return "Please enter at least one rider.";
        }

        if (
            vehicleDetails.luggage_kg !== ""
            && (!Number.isFinite(Number(vehicleDetails.luggage_kg)) || Number(vehicleDetails.luggage_kg) < 0)
        ) {
            return "Please enter valid luggage weight.";
        }

        return "";
    };

    const analyzeTransport = async () => {
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch("http://localhost:8000/transport/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestPayload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Backend error ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (transportError) {
            setError(`Unable to analyze transport: ${transportError.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#111b32] rounded-2xl p-8 space-y-8 text-white">
            <div>
                <p className="text-cyan-400 text-lg mb-2">
                    Transport Intelligence
                </p>

                <h2 className="text-3xl font-bold">
                    Compare Travel Modes
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="block">
                    <span className="block text-sm text-gray-400 mb-2">
                        Source
                    </span>
                    <input
                        type="text"
                        value={source}
                        onChange={(event) => setSource(event.target.value)}
                        className="w-full bg-[#1b2942] border border-gray-600 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
                    />
                </label>

                <label className="block">
                    <span className="block text-sm text-gray-400 mb-2">
                        Destination
                    </span>
                    <input
                        type="text"
                        value={destination}
                        readOnly
                        className="w-full bg-[#1b2942] border border-gray-700 rounded-xl px-4 py-3 text-gray-300 outline-none"
                    />
                </label>

                <label className="block">
                    <span className="block text-sm text-gray-400 mb-2">
                        Distance (km)
                    </span>
                    <input
                        type="number"
                        min="1"
                        value={distanceKm}
                        onChange={(event) => setDistanceKm(event.target.value)}
                        className="w-full bg-[#1b2942] border border-gray-600 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
                    />
                </label>
            </div>

            <div>
                <p className="text-sm text-gray-400 mb-3">
                    Transport mode
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {TRANSPORT_MODES.map((mode) => (
                        <button
                            type="button"
                            key={mode}
                            onClick={() => setSelectedMode(mode)}
                            className={`px-4 py-3 rounded-xl font-semibold transition ${
                                selectedMode === mode
                                    ? "bg-cyan-500 text-black"
                                    : "bg-[#1b2942] hover:bg-[#263752]"
                            }`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            {needsVehicleDetails && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="block">
                        <span className="block text-sm text-gray-400 mb-2">
                            Vehicle model
                        </span>
                        <input
                            type="text"
                            value={vehicleDetails.vehicle_model}
                            onChange={(event) => updateVehicleField("vehicle_model", event.target.value)}
                            className="w-full bg-[#1b2942] border border-gray-600 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
                        />
                    </label>

                    <label className="block">
                        <span className="block text-sm text-gray-400 mb-2">
                            Mileage (km/l)
                        </span>
                        <input
                            type="number"
                            min="1"
                            value={vehicleDetails.mileage_kmpl}
                            onChange={(event) => updateVehicleField("mileage_kmpl", event.target.value)}
                            className="w-full bg-[#1b2942] border border-gray-600 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
                        />
                    </label>

                    <label className="block">
                        <span className="block text-sm text-gray-400 mb-2">
                            Fuel tank capacity
                        </span>
                        <input
                            type="number"
                            min="1"
                            value={vehicleDetails.fuel_tank_liters}
                            onChange={(event) => updateVehicleField("fuel_tank_liters", event.target.value)}
                            className="w-full bg-[#1b2942] border border-gray-600 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
                        />
                    </label>

                    <label className="block">
                        <span className="block text-sm text-gray-400 mb-2">
                            Fuel price/litre
                        </span>
                        <input
                            type="number"
                            min="0"
                            value={vehicleDetails.fuel_price_per_liter}
                            onChange={(event) => updateVehicleField("fuel_price_per_liter", event.target.value)}
                            className="w-full bg-[#1b2942] border border-gray-600 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
                        />
                    </label>

                    <label className="block">
                        <span className="block text-sm text-gray-400 mb-2">
                            Riders
                        </span>
                        <input
                            type="number"
                            min="1"
                            value={vehicleDetails.riders}
                            onChange={(event) => updateVehicleField("riders", event.target.value)}
                            className="w-full bg-[#1b2942] border border-gray-600 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
                        />
                    </label>

                    <label className="block">
                        <span className="block text-sm text-gray-400 mb-2">
                            Luggage (kg)
                        </span>
                        <input
                            type="number"
                            min="0"
                            value={vehicleDetails.luggage_kg}
                            onChange={(event) => updateVehicleField("luggage_kg", event.target.value)}
                            className="w-full bg-[#1b2942] border border-gray-600 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
                        />
                    </label>

                    <label className="flex items-center gap-3 bg-[#1b2942] border border-gray-600 rounded-xl px-4 py-3">
                        <input
                            type="checkbox"
                            checked={vehicleDetails.pillion}
                            onChange={(event) => updateVehicleField("pillion", event.target.checked)}
                            className="h-4 w-4 accent-cyan-500"
                        />
                        <span className="text-sm text-gray-300">
                            Pillion
                        </span>
                    </label>
                </div>
            )}

            {error && (
                <div className="rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-red-200">
                    {error}
                </div>
            )}

            <button
                type="button"
                onClick={analyzeTransport}
                disabled={loading}
                className="w-full bg-cyan-500 text-black py-4 rounded-xl font-bold text-lg hover:bg-cyan-400 transition disabled:opacity-60"
            >
                {loading ? "Analyzing..." : "Analyze Transport →"}
            </button>

            {result && (
                <div className="border-t border-gray-600 pt-6 space-y-5">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">
                            {result.source} → {result.destination}
                        </h3>

                        <p className="text-gray-300">
                            Distance: {result.distance_km} km
                        </p>

                        <p className="text-gray-300">
                            Your selection: {selectedMode}
                        </p>

                        <p className="text-gray-300">
                            Recommended: {result.recommended_mode || "No recommendation available"}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.modes.map((mode) => {
                            const isSelected = mode.mode === selectedMode;
                            const isRecommended = mode.mode === result.recommended_mode;

                            return (
                                <div
                                    key={mode.mode}
                                    className={`rounded-xl p-5 bg-[#1b2942] border ${
                                        isSelected
                                            ? "border-cyan-400"
                                            : "border-gray-700"
                                    }`}
                                >
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <h4 className="text-xl font-bold">
                                            {mode.mode}
                                        </h4>

                                        {isSelected && (
                                            <span className="text-xs font-semibold bg-cyan-500 text-black rounded-full px-3 py-1">
                                                Selected
                                            </span>
                                        )}

                                        {isRecommended && (
                                            <span className="text-xs font-semibold bg-emerald-400 text-black rounded-full px-3 py-1">
                                                Recommended
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-2 text-gray-300">
                                        <p>
                                            Estimated time: {mode.estimated_time_hours} hours
                                        </p>

                                        <p>
                                            Estimated transport cost: {mode.estimated_transport_cost === null
                                                ? "Not available"
                                                : `Rs. ${mode.estimated_transport_cost}`}
                                        </p>

                                        {mode.fuel_required_liters !== null && (
                                            <p>
                                                Fuel required: {mode.fuel_required_liters} litres
                                            </p>
                                        )}

                                        {mode.fuel_cost !== null && (
                                            <p>
                                                Fuel cost: Rs. {mode.fuel_cost}
                                            </p>
                                        )}
                                    </div>

                                    {mode.notes?.length > 0 && (
                                        <ul className="mt-4 space-y-2 text-sm text-gray-400">
                                            {mode.notes.map((note) => (
                                                <li key={note}>
                                                    {note}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
