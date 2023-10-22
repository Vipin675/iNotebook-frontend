import { useContext, createContext, useState } from "react";

// AlertContext --------------------------------------------------
import { AlertContext } from "./AlertContext";
// AlertContext --------------------------------------------------

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const baseAPIUrl = "https://inotebookapi-9vwo.onrender.com";

  const { showAlert } = useContext(AlertContext);
  const [notes, setNotes] = useState([]);

  // GET ALL NOTES
  const getAllNotes = async () => {
    const options = {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };

    await fetch(`${baseAPIUrl}/api/notes/fetch-all-notes`, options)
      .then((response) => response.json())
      .then((response) => {
        setNotes(response);
      })
      .catch((err) => console.error(err));
  };

  // ADD NEW NOTE
  const addNote = async (newNote) => {
    const { title, description, tag } = newNote;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: `{"title":"${title}","description":"${description}","tag":"${tag}"}`,
    };

    await fetch(`${baseAPIUrl}/api/notes/add-note`, options)
      .then((response) => response.json())
      .then((response) => {
        showAlert("success", `NEW NOTE CREATED`);
        console.log(response);
      })
      .catch((err) => console.error(err));

    getAllNotes();
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };

    await fetch(`${baseAPIUrl}/api/notes/delete/${id}`, options)
      .then((response) => response.json())
      .then((response) => {
        showAlert("success", `NOTE DELETED`);
        console.log(response);
      })
      .catch((err) => console.error(err));

    getAllNotes();
  };

  // UPDATE NOTE
  const updateNote = async (id, note) => {
    console.log("update api called", note, "id : ", id);
    const { title, description, tag } = note;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: `{"title":"${title}","description":"${description}","tag":"${tag}"}`,
    };

    await fetch(`${baseAPIUrl}/api/notes/update/${id}`, options)
      .then((response) => response.json())
      .then((response) => {
        showAlert("success", `NOTE UPDATED`);
        console.log(response);
      })
      .catch((err) => console.error(err));

    getAllNotes();
  };

  return (
    <NotesContext.Provider
      value={{ notes, getAllNotes, addNote, deleteNote, updateNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};
