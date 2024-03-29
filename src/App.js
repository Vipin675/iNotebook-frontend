import "./App.css";
import Navigation from "./routes/navigation/Navigation";

import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/Home";
import About from "./routes/about/About";
import Login from "./routes/login/Login";
import SignUp from "./routes/sign-up/SignUp";
import GlobalNotes from "./routes/globalNotes/GlobalNotes";
import NoteDetails from "./routes/noteDetails/NoteDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="global" element={<GlobalNotes />} />
        <Route path="/note/:id" element={<NoteDetails />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
