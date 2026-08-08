import RecommendationCard from "./RecommendationCard";
import RouteCard from "./RouteCard";

function RecommendationDashboard() {
    return (
        <div className="max-w-6xl mx-auto space-y-8 py-10 px-4">

            <RecommendationCard
                destination="Goa"
                description="Enjoy pristine beaches, Portuguese heritage, vibrant nightlife and water sports."
                rating={4.8}
                bestTime="October -March"
                estimatedCost="₹25,000"
                image="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200"
            />

            <RouteCard
                transport="Bike"
                distance="612 km"
                travelTime="11 hrs 20 mins"
                fuelCost="₹1,950"
                tollCost="₹0"
                roadCondition="Excellent"
                routeType="Scenic Coastal Route"
            />

        </div>
    );
}

export default RecommendationDashboard;