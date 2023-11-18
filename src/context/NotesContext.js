import { useContext, createContext, useState } from "react";

// AlertContext --------------------------------------------------
import { AlertContext } from "./AlertContext";
// AlertContext --------------------------------------------------

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const baseAPIUrl = process.env.REACT_APP_API_BASE_URL;
  const { showAlert } = useContext(AlertContext);

  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteDetails, setNoteDetails] = useState({});

  // GET GLOBAL PUBLIC NOTES
  const getGlobalPublicNotes = async () => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => console.error(err));
    setLoading(false);
  };

  // GET ALL NOTES
  const getAllNotes = async () => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // GET NOTE DETAILS
  const getNoteDetails = async (noteId) => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // ADD NEW NOTE
  const addNote = async (newNote) => {
    setLoading(true);
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

    await fetch(`${baseAPIUrl}/api/notes/add-note`, options)
      .then((response) => response.json())
      .then((response) => {
        showAlert("success", `NEW NOTE CREATED`);
        console.log(response);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

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
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    getAllNotes();
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        noteDetails,
        loading,
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
