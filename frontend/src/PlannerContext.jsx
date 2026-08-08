import { createContext, useState } from "react";

export const PlannerContext = createContext();

export function PlannerProvider({ children }) {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(25000);
  const [transport, setTransport] = useState("");
  const [interests, setInterests] = useState([]);

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <PlannerContext.Provider
      value={{
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

        trip,
        setTrip,

        loading,
        setLoading,

        error,
        setError,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
}