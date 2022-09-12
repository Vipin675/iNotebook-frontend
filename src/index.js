import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { NotesProvider } from "./context/NotesContext";
import { UserProvider } from "./context/UserContext";
import { AlertProvider } from "./context/AlertContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AlertProvider>
      <UserProvider>
        <NotesProvider>
          <App />
        </NotesProvider>
      </UserProvider>
    </AlertProvider>
  </BrowserRouter>
);
