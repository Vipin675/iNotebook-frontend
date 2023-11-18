import { useContext, createContext, useState } from "react";

// AlertContext --------------------------------------------------
import { AlertContext } from "./AlertContext";
// AlertContext --------------------------------------------------

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const baseAPIUrl = "https://inotebookapi-9vwo.onrender.com";
  // const baseAPIUrl = "http://localhost:5000";

  const { showAlert } = useContext(AlertContext);
  const [notes, setNotes] = useState([]);
  const [noteDetails, setNoteDetails] = useState({});

  // GET GLOBAL PUBLIC NOTES
  const getGlobalPublicNotes = async () => {
    const options = {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };

    await fetch(`${baseAPIUrl}/api/notes/fetch-global-public-notes`, options)
      .then((response) => response.json())
      .then((response) => {
        setNotes(response);
      })
      .catch((err) => console.error(err));
  };

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

  // GET NOTE DETAILS
  const getNoteDetails = async (noteId) => {
    const options = {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };

    await fetch(`${baseAPIUrl}/api/notes/note/${noteId}`, options)
      .then((response) => response.json())
      .then((response) => {
        setNoteDetails(response);
      })
      .catch((err) => console.error(err));
  };

  // ADD NEW NOTE
  const addNote = async (newNote) => {
    const { title, description, tag, visibility, selectedUser } = newNote;
    let selectedUsersArray = [];
    if (visibility === "shared") {
      selectedUsersArray = selectedUser.split(",");
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
        tag,
        visibility,
        selectedUser: selectedUsersArray,
      }),
    };

    console.log(options);

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
    const { title, description, tag, visibility, selectedUser } = note;
    let selectedUsersArray = [];
    if (visibility === "shared") {
      selectedUsersArray = selectedUser.split(",");
    }
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
        tag,
        visibility,
        selectedUser: selectedUsersArray,
      }),
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
      value={{
        notes,
        noteDetails,
        getAllNotes,
        addNote,
        deleteNote,
        updateNote,
        getGlobalPublicNotes,
        getNoteDetails,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
