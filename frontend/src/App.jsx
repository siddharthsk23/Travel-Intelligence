import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AIAssistant from "./pages/AIAssistant";
import Dashboard from "./pages/Dashboard";

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

            </Routes>
        </BrowserRouter>
    );
}

export default App;