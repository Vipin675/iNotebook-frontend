import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { NotesContext } from "../../context/NotesContext";

const NoteDetails = () => {
  const location = useLocation();
  const noteId = location.pathname.split("/")[2];
  const { loading, noteDetails, getNoteDetails } = useContext(NotesContext);

  useEffect(() => {
    getNoteDetails(noteId);
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
          "loading...."
        ) : (
          <>
            <h2>{noteDetails.note?.title}</h2>
            <p>{noteDetails.note?.description}</p>
            <strong>{noteDetails?.createrName}</strong> ||
            <strong>{" " + noteDetails?.createrEmail}</strong>
            {noteDetails.note?.sharedWith.length !== 0 && (
              <>
                <div className="mt-3">
                  <h3>Shared With : </h3>
                  {noteDetails.note?.sharedWith.map((su, key) => (
                    <div key={key}>
                      <span>{su}</span> <br />
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default NoteDetails;
