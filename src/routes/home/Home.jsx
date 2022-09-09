import React from "react";
import AddNote from "../../components/add-new-note/AddNote";
import Notes from "../../components/notes/Notes.components";

const Home = () => {
  return (
    <>
      <div>
        <AddNote />
        <hr />
        <Notes />
      </div>
    </>
  );
};

export default Home;
