import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AIAssistant from "./pages/AIAssistant";
import Dashboard from "./pages/Dashboard";
import Planner from "./pages/Planner";
import Trip from "./pages/Trip";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/assistant"
                    element={<AIAssistant />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/planner"
                    element={<Planner />}
                />

                <Route
                    path="/trip"
                    element={<Trip />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;