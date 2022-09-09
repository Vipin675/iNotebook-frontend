import React, { useContext } from "react";
import { useEffect } from "react";
import { NotesContext } from "../../context/NotesContext";
import NotesItem from "../notesItem/NotesItem.components";

const Notes = () => {
  const { notes, getAllNotes } = useContext(NotesContext);

  useEffect(() => {
    getAllNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container my-3">
        <div className="row my-3">
          <h3>Your Notes</h3>
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
