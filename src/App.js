import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import Header from "./components/Header";
import Favoris from "./pages/Favoris";
import Albums from "./pages/Albums";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/favoris" element={<Favoris />} />
        <Route path="/albums/:id" element={<Albums />} />
      </Routes>
    </Router>
  );
}

export default App;
