import React, { useContext, useState } from "react";
import { NotesContext } from "../../context/NotesContext";

const AddNote = () => {
  const { addNote } = useContext(NotesContext);

  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(newNote);
    setNewNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  return (
    <div className="container my-3">
      <h3>Add New Note</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Enter title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={handleChange}
            value={newNote.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={handleChange}
            value={newNote.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={handleChange}
            value={newNote.tag}
          />
        </div>
        <button
          disabled={newNote.title < 3 || newNote.description < 6}
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Add notes
        </button>
      </form>
    </div>
  );
};

export default AddNote;