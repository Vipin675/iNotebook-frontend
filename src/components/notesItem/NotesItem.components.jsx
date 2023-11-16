import React, { useContext, useState } from "react";
import { NotesContext } from "../../context/NotesContext";
import { Link, useLocation } from "react-router-dom";

const NotesItem = ({ note }) => {
  const location = useLocation();
  const { deleteNote, updateNote } = useContext(NotesContext);
  const [newUpdateNote, setNewUpdateNote] = useState({
    title: note.title,
    description: note.description,
    tag: note.tag,
    visibility: note.visibility,
    selectedUser: note.sharedWith.join(","),
  });

  const handlDeleteClick = (id) => {
    deleteNote(id);
  };

  const [modal, setModal] = useState(false);
  const handleShow = () => {
    setModal(!modal);
  };

  // form _--------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    updateNote(note._id, newUpdateNote);
    setModal(!modal);
  };
  const handleChange = (e) => {
    setNewUpdateNote({ ...newUpdateNote, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        className={`modal ${modal ? "bg-dark bg-opacity-75" : ""} `}
        style={{ display: `${modal ? "block" : ""}` }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header text-light bg-info">
              <h5 className="modal-title">Update {note.title} note</h5>
              <button
                type="button"
                className="btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleShow}
              ></button>
            </div>
            <div className="modal-body">
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
                    value={newUpdateNote.title}
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
                    value={newUpdateNote.description}
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
                    value={newUpdateNote.tag}
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
                    value={newUpdateNote.visibility}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="shared">Shared</option>
                  </select>
                </div>
                {newUpdateNote.visibility === "shared" && (
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
                      value={newUpdateNote.selectedUser}
                    />
                  </div>
                )}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleShow}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card my-3">
          <div
            className="card-body"
            style={{
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
            }}
          >
            <div className="card-title d-flex align-item-center justify-content-between">
              <h5>{note.title.substring(0, 21) + " ..."}</h5>
              <div>
                <Link to={`/note/${note._id}`}>
                  <i className="mx-1 badge rounded-full text-bg-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="bi bi-eye-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg>
                  </i>
                </Link>
                {location.pathname === "/global" ? (
                  // note.user
                  ""
                ) : (
                  <>
                    <i
                      className="mx-1 badge rounded-full text-bg-success"
                      onClick={handleShow}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="white"
                        className="bi bi-pen-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                      </svg>
                    </i>
                    <i
                      className="mx-1 badge rounded-full text-bg-danger"
                      onClick={() => handlDeleteClick(note._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        className="bi bi-trash2-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                      </svg>
                    </i>
                  </>
                )}
              </div>
            </div>

            <p className="card-text">
              {note.description.substring(0, 300) + " ..."}
            </p>
          </div>
          <div className="card-footer">
            tag used: <span className="badge text-bg-info">{note.tag}</span>{" "}
            <span className="badge rounded-pill text-bg-secondary">
              {note.visibility}
            </span>
            {note.visibility === "shared"
              ? note.sharedWith.map((user, key) => <div key={key}>{user}</div>)
              : ""}
            {/* {note.visibility === "shared" ? note.user : ""} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesItem;
