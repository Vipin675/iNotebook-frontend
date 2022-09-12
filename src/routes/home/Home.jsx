import React from "react";
import AddNote from "../../components/add-new-note/AddNote";
import Notes from "../../components/notes/Notes.components";

const Home = () => {
  return (
    <>
      <div>
        <AddNote />
        <div className="container">
          <hr className="border border-dark border-3 opacity-75" />
        </div>
        <Notes />
      </div>
    </>
  );
};

export default Home;
