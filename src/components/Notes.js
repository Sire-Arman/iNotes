import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <AddNote />
      <div className="row my-3 mx-4 d-flex align-items-center">
        <h1>Your Notes</h1>
        {notes.map((notes) => {
          return <Noteitem key={notes._id} notes={notes} />;
        })}
      </div>
    </>
  );
};

export default Notes;
