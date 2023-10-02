import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial =[];

  const [notes, setNotes] = useState(notesInitial);


  // Get All Notes
  const getNotes = async () => {
    // API call;
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMzNkMzNiMTU5Y2Q3NTdjYjllZjllIn0sImlhdCI6MTY5NDcxMTA5MX0.WV4NokptgIe3PjrYdVlICg0eVU8KAA5dNLwPl6x4YlE",
      }
    });
    const json = await response.json();
    console.log(json)
    setNotes(json);
  };
  // Add a Note
  const addNotes = async (title, description, tag) => {
    // API call;
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMzNkMzNiMTU5Y2Q3NTdjYjllZjllIn0sImlhdCI6MTY5NDcxMTA5MX0.WV4NokptgIe3PjrYdVlICg0eVU8KAA5dNLwPl6x4YlE",
      },
      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
    const json = await response.json();

    // add logic 
    setNotes(notes.concat(json));
  };
  // Delete a Note
  const deleteNotes = (id) => {
    // console.log("delete a note  " + id)
    // Add API call
    const newNotes = notes.filter((notes) => {
      return notes._id !== id;
    });
    // console.log("delete a note  " + id)
    setNotes(newNotes);
  };
  // Edit a Note
  const editNotes = async (id, title, description, tag) => {
    // API call;
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMzNkMzNiMTU5Y2Q3NTdjYjllZjllIn0sImlhdCI6MTY5NDcxMTA5MX0.WV4NokptgIe3PjrYdVlICg0eVU8KAA5dNLwPl6x4YlE",
      },
      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects

    // edit logic
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNotes, deleteNotes, editNotes, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
