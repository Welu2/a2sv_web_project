import { useEffect, useState } from "react";
import { fetchOpportunities } from "./services/api";
import OpportunityCard from "./components/OpportunityCard";
import type { Opportunity } from "./types/Opportunity";
import "./App.css";

function App() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [error, setError] = useState("");

  console.log("🔥 App rendered"); // 👈 Top-level log

  useEffect(() => {
    console.log("🚀 useEffect triggered"); // 👈 Check if effect runs

    fetchOpportunities()
      .then((data) => {
        console.log("📦 Data in useEffect:", data); // 👈 See result
        setOpportunities(data);
      })
      .catch(() => setError("Failed to fetch data."));
  }, []);

  return (
    <div className="App">
      <h1>Opportunities</h1>
      {error && <p className="error">{error}</p>}
      {opportunities.length === 0 && <p>No data available.</p>}
      {opportunities.map((opp) => (
        <OpportunityCard key={opp.id} opportunity={opp} />
      ))}
    </div>
  );
}

export default App;
