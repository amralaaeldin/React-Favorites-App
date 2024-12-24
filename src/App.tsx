import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import "./App.css";

export default function App() {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<div>Search</div>} />
        <Route path="/favorites" element={<div>Favorites</div>} />
      </Routes>
    </Router>
  );
}
