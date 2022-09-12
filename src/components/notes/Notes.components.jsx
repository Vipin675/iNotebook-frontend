import React, { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NotesContext } from "../../context/NotesContext";
import NotesItem from "../notesItem/NotesItem.components";

const Notes = () => {
  const navigate = useNavigate();
  const { notes, getAllNotes } = useContext(NotesContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container my-3  border-end border-start">
        <div className="row my-3">
          <h3 className="text-center">Your Notes</h3>
          {notes.length !== 0 ? (
            notes.map((note) => {
              return <NotesItem key={note._id} note={note} />;
            })
          ) : (
            <div className="container">There is nothing to see :(</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;
