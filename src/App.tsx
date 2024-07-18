import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// local imports
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Games from "./pages/Games";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/games/:id" element={<Games />} />
      </Routes>
      <Footer />
    </Router>
  );
}
