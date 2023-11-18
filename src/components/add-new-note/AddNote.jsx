import React, { useContext, useState } from "react";
import { NotesContext } from "../../context/NotesContext";

const AddNote = () => {
  const { loading, addNote } = useContext(NotesContext);

  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    tag: "",
    visibility: "public", // Default to 'public'
    selectedUser: "", // Selected user for shared notes
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
      visibility: "public",
      selectedUser: "",
    });
  };

  return (
    <div
      className="container p-2 my-3 text-dark bg-light rounded p-5"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
      }}
    >
      <h3 className="text-center">CREATE NOTE</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <h5>Enter title</h5>
          </label>
          <input
            type="text"
            className="form-control border-success"
            required
            minLength={3}
            id="title"
            name="title"
            onChange={handleChange}
            value={newNote.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            <h5>Description</h5>
          </label>
          <textarea
            type="text"
            className="form-control border-success"
            required
            minLength={8}
            id="description"
            name="description"
            onChange={handleChange}
            value={newNote.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            <h5>Tag</h5>
          </label>
          <input
            type="text"
            className="form-control border-success"
            required
            minLength={3}
            id="tag"
            name="tag"
            onChange={handleChange}
            value={newNote.tag}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="visibility" className="form-label">
            <h5>Visibility</h5>
          </label>
          <select
            className="form-control border-success"
            id="visibility"
            name="visibility"
            onChange={handleChange}
            value={newNote.visibility}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="shared">Shared</option>
          </select>
        </div>
        {newNote.visibility === "shared" && (
          <div className="mb-3">
            <label htmlFor="selectedUser" className="form-label">
              <h5>Select User</h5>
            </label>
            <input
              type="text"
              className="form-control border-success"
              id="selectedUser"
              name="selectedUser"
              onChange={handleChange}
              value={newNote.selectedUser}
            />
          </div>
        )}
        <button
          disabled={newNote.title.length < 4 || newNote.description.length < 6}
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          {loading ? "loading..." : <>Add notes</>}
        </button>
      </form>
    </div>
  );
};

export default AddNote;
