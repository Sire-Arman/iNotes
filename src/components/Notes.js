import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes,getNotes } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, [] );

  return (
    <>
      <AddNote />
      <div className="row my-3 mx-5 ">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          return <Noteitem key={notes._id} note={note} />;
        })}
        </div>
    </>
  );
};

export default Notes;
