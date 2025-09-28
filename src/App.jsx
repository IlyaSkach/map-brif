import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SettlementPage from "./pages/SettlementPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/settlement/:id" element={<SettlementPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
