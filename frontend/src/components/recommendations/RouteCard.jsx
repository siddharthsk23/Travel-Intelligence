import Button from "../common/Button";

function RouteCard({
    transport,
    distance,
    travelTime,
    fuelCost,
    tollCost,
    roadCondition,
    routeType,
}) {
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg hover:border-cyan-400 transition-all duration-300">

            <h2 className="text-2xl font-bold text-white mb-6">
                🚗 Route Intelligence
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                <div className="bg-slate-700 rounded-xl p-4">
                    <p className="text-slate-400 text-sm">Transport</p>
                    <h3 className="text-xl text-cyan-400 font-semibold">
                        {transport}
                    </h3>
                </div>

                <div className="bg-slate-700 rounded-xl p-4">
                    <p className="text-slate-400 text-sm">Distance</p>
                    <h3 className="text-xl text-white">
                        {distance}
                    </h3>
                </div>

                <div className="bg-slate-700 rounded-xl p-4">
                    <p className="text-slate-400 text-sm">Travel Time</p>
                    <h3 className="text-xl text-white">
                        {travelTime}
                    </h3>
                </div>

                <div className="bg-slate-700 rounded-xl p-4">
                    <p className="text-slate-400 text-sm">Fuel Cost</p>
                    <h3 className="text-xl text-cyan-400">
                        {fuelCost}
                    </h3>
                </div>

                <div className="bg-slate-700 rounded-xl p-4">
                    <p className="text-slate-400 text-sm">Toll Cost</p>
                    <h3 className="text-xl text-cyan-400">
                        {tollCost}
                    </h3>
                </div>

                <div className="bg-slate-700 rounded-xl p-4">
                    <p className="text-slate-400 text-sm">Road Condition</p>
                    <h3 className="text-xl text-white">
                        {roadCondition}
                    </h3>
                </div>

            </div>

            <div className="mt-6 bg-slate-700 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                    Recommended Route
                </p>

                <h3 className="text-lg text-white mt-1">
                    {routeType}
                </h3>
            </div>

            <div className="mt-6">
                <Button>
                    View Route on Map
                </Button>
            </div>

        </div>
    );
}

export default RouteCard;