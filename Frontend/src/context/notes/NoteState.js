import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  // const host = "https://i-notes-tau.vercel.app";
  const host = "http://localhost:5000"
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get All Notes
  const getNotes = async () => {
    // API call;
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });

    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };
  // Add a Note
  const addNotes = async (title, description, tag) => {
    // API call;
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  };
  // Delete a Note
  const deleteNotes = async (id) => {
    // console.log("delete a note  " + id)
    //  API call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    // const json = response.json();
    // console.log(json);
    const newNotes = notes.filter((notes) => {
      return notes._id !== id;
    });
    // console.log("delete a note  " + id)
    setNotes(newNotes);
  };
  // Edit a Note
  const editNotes = async (id, title, description, tag) => {
    // API call;
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    // const json = await response.json(); // parses JSON response into native JavaScript objects
    // console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));
    // edit logic
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);

  };

  return (
    <NoteContext.Provider
      value={{ notes, addNotes, deleteNotes, editNotes, getNotes  }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
