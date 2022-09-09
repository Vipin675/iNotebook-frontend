import { createContext, useState } from "react";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  // GET ALL NOTES
  const getAllNotes = async () => {
    const options = {
      method: "GET",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTc1N2Y3MTUxZjM2YWRkZmE4MDgzMiIsImlhdCI6MTY2MjQ3NDI3MH0.EfMVH5RPpcnVVjfR8-Vkmp3sKIe9p8kPfM0TzfytopQ",
      },
    };

    await fetch("http://localhost:5000/api/notes/fetch-all-notes", options)
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTc1N2Y3MTUxZjM2YWRkZmE4MDgzMiIsImlhdCI6MTY2MjQ3NDI3MH0.EfMVH5RPpcnVVjfR8-Vkmp3sKIe9p8kPfM0TzfytopQ",
      },
      body: `{"title":"${title}","description":"${description}","tag":"${tag}"}`,
    };

    await fetch("http://localhost:5000/api/notes/add-note", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

    getAllNotes();
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTc1N2Y3MTUxZjM2YWRkZmE4MDgzMiIsImlhdCI6MTY2MjQ3NDI3MH0.EfMVH5RPpcnVVjfR8-Vkmp3sKIe9p8kPfM0TzfytopQ",
      },
    };

    await fetch(`http://localhost:5000/api/notes/delete/${id}`, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTc1N2Y3MTUxZjM2YWRkZmE4MDgzMiIsImlhdCI6MTY2MjQ3NDI3MH0.EfMVH5RPpcnVVjfR8-Vkmp3sKIe9p8kPfM0TzfytopQ",
      },
      body: `{"title":"${title}","description":"${description}","tag":"${tag}"}`,
    };

    await fetch(`http://localhost:5000/api/notes/update/${id}`, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
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
