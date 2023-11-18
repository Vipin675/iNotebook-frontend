import React, { useContext, useEffect } from "react";
import { NotesContext } from "../../context/NotesContext";
import NotesItem from "../../components/notesItem/NotesItem.components";

const GlobalNotes = () => {
  const { loading, notes, getGlobalPublicNotes } = useContext(NotesContext);
  useEffect(() => {
    getGlobalPublicNotes();
  }, []);

  return (
    <>
      <div
        className="container p-1 my-3 text-dark bg-light rounded p-5"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
        }}
      >
        {loading ? (
          "loading "
        ) : (
          <>
            <div className="row my-3">
              <h2 className="text-center">GLOBAL NOTES</h2>
              {notes.length !== 0 ? (
                notes.map((note) => {
                  return <NotesItem key={note._id} note={note} />;
                })
              ) : (
                <div className="container">There is nothing to see!</div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GlobalNotes;
