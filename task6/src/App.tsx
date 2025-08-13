import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import JobDetail from "./pages/JobDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
    </Routes>
  );
}

export default App;

// import React from "react";
// import Dashboard from "./pages/dashboard";

// const App = () => <Dashboard />;
// export default App;
