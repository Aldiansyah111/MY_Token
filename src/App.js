import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import AccountInfo from "./components/AccountInfo";
import ICOPage from "./components/ICOPage";
import StakingPage from "./components/StakingPage";
import TokenDashboard from "./components/TokenDashboard";

function App() {
  const appStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const mainStyle = {
    flex: 1,
    padding: "1rem",
  };

  return (
    <Router>
      <div style={appStyle}>
        <Navbar />

        <main style={mainStyle}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ICOPage" element={<ICOPage />} />
            <Route path="/staking" element={<StakingPage />} />
            <Route path="/tokenDashboard" element={<TokenDashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
