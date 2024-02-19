import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { UserProfile } from "./pages/UserProfile";
import Careerpage from "./pages/CareerPage";
import Adminpage from "./pages/Adminpage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/careers" element={<Careerpage />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/admin" element= {<Adminpage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
