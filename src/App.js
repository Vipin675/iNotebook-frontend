import "./App.css";
import Navigation from "./routes/navigation/Navigation";

import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/Home";
import About from "./routes/about/About";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
