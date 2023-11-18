import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NotesContext } from "../../context/NotesContext";
import NotesItem from "../notesItem/NotesItem.components";

const Notes = () => {
  const navigate = useNavigate();
  const { loading, notes, getAllNotes } = useContext(NotesContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedVisibility, setSelectedVisibility] = useState("all");

  const handleVisibilityChange = (e) => {
    setSelectedVisibility(e.target.value);
  };

  const filteredNotes = notes.filter((note) => {
    if (selectedVisibility === "all") {
      return true;
    } else {
      return note.visibility === selectedVisibility;
    }
  });

  return (
    <>
      <div
        className="container p-1 my-3 text-dark bg-light rounded p-5"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
        }}
      >
        <div className="row my-3">
          <h2 className="text-center">YOUR NOTES</h2>

          {/* Visibility Filter Select Input */}
          <div className="mb-3">
            <label htmlFor="visibilityFilter" className="form-label">
              Filter by Visibility:
            </label>
            <select
              className="form-control"
              id="visibilityFilter"
              value={selectedVisibility}
              onChange={handleVisibilityChange}
            >
              <option value="all">All</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="shared">Shared</option>
            </select>
          </div>

          {loading ? (
            "loading"
          ) : filteredNotes.length !== 0 ? (
            filteredNotes.map((note) => {
              return <NotesItem key={note._id} note={note} />;
            })
          ) : (
            <div className="container">There is nothing to see!</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;
