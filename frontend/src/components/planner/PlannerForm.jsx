import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMotorcycle,
  FaCar,
  FaTrain,
  FaPlane,
  FaBus,
} from "react-icons/fa";

function PlannerForm() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(25000);
  const [transport, setTransport] = useState("");
  const [interests, setInterests] = useState([]);

  const destinations = [
    "Goa",
    "Gokarna",
    "Pondicherry",
    "Andaman",
    "Manali",
    "Leh",
    "Spiti",
    "Coorg",
    "Munnar",
    "Jaipur",
    "Mysore",
    "Delhi",
    "Hampi",
    "Bandipur",
    "Kabini",
    "Jim Corbett",
    "Kaziranga",
  ];

  const interestOptions = [
    "Beach",
    "Mountains",
    "History",
    "Adventure",
    "Wildlife",
  ];

  const transports = [
    {
      id: "bike",
      name: "Bike",
      icon: <FaMotorcycle size={28} />,
    },
    {
      id: "car",
      name: "Car",
      icon: <FaCar size={28} />,
    },
    {
      id: "bus",
      name: "Bus",
      icon: <FaBus size={28} />,
    },
    {
      id: "train",
      name: "Train",
      icon: <FaTrain size={28} />,
    },
    {
      id: "flight",
      name: "Flight",
      icon: <FaPlane size={28} />,
    },
  ];

  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleGenerate = () => {
    console.log({
      destination,
      days,
      budget,
      transport,
      interests,
    });
  };

  return (
    <section className="max-w-5xl mx-auto mt-16 bg-slate-800 rounded-2xl p-8 shadow-xl">

      <h2 className="text-4xl font-bold text-white mb-8">
        Plan Your Trip
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Destination */}

        <div>
          <label className="text-white block mb-2">
            Destination
          </label>

          <input
            type="text"
            list="destination-list"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Search destination..."
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />

          <datalist id="destination-list">
            {destinations.map((place) => (
              <option
                key={place}
                value={place}
              />
            ))}
          </datalist>
        </div>

        {/* Days */}

        <div>
          <label className="text-white block mb-2">
            Days
          </label>

          <input
            type="number"
            min="1"
            max="30"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />
        </div>

        {/* Budget */}

        <div className="md:col-span-2">

          <label className="text-white block mb-2">
            Budget
          </label>

          <p className="text-cyan-400 text-2xl font-bold mb-3">
            {budget === 0
              ? "Flexible Budget"
              : `₹${budget.toLocaleString()}`}
          </p>

          <input
            type="range"
            min="0"
            max="500000"
            step="1000"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Transport */}

      <div className="mt-10">

        <h3 className="text-white text-xl mb-4">
          Preferred Transport
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

          {transports.map((item) => (

            <button
              key={item.id}
              onClick={() => setTransport(item.id)}
              className={`rounded-xl p-5 border transition-all

              ${
                transport === item.id
                  ? "border-cyan-400 bg-cyan-600 text-white"
                  : "border-slate-600 bg-slate-700 text-gray-300 hover:bg-slate-600"
              }`}
            >

              <div className="flex justify-center mb-2">
                {item.icon}
              </div>

              <p>{item.name}</p>

            </button>

          ))}

        </div>

      </div>

      {/* Interests */}

      <div className="mt-10">

        <h3 className="text-white text-xl mb-4">
          Interests
        </h3>

        <div className="flex flex-wrap gap-4">

          {interestOptions.map((interest) => (

            <label
              key={interest}
              className="flex items-center gap-2 text-white cursor-pointer"
            >

              <input
                type="checkbox"
                checked={interests.includes(interest)}
                onChange={() => toggleInterest(interest)}
              />

              {interest}

            </label>

          ))}

        </div>

      </div>

      {/* Surprise */}

      <div className="mt-10">

        <label className="flex items-center gap-3 text-white">

          <input type="checkbox" />

          <span>
            🎲 Surprise Me (AI chooses destination)
          </span>

        </label>

      </div>

      {/* Planning paths */}

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={() => navigate("/assistant")}
          className="flex-1 bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl text-white text-lg font-semibold transition"
        >
          Continue with AI
        </button>

        <button
          type="button"
          onClick={() => navigate("/planner")}
          className="flex-1 bg-slate-700 hover:bg-slate-600 border border-slate-600 px-8 py-3 rounded-xl text-white text-lg font-semibold transition"
        >
          Plan a Trip
        </button>
      </div>

    </section>
  );
}

export default PlannerForm;
