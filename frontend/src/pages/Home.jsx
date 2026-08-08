import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import PlannerForm from "../components/planner/PlannerForm";
import RecommendationDashboard from "../components/recommendations/RecommendationDashboard";

function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <Hero />
      <PlannerForm />
      <RecommendationDashboard />
    </div>
  );
}

export default Home;