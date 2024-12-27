import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";
import Favorites from "./pages/Favorites";
import UpdateFavorite from "./pages/UpdateFavorite";
import "./App.css";

export default function App() {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SearchPage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/favorites/:id" element={<UpdateFavorite />} />
      </Routes>
    </Router>
  );
}
