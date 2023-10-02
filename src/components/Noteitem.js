import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {
  const { notes } = props;
  const context = useContext(NoteContext);
  const { deleteNotes } = context;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex aign-items-left">
            <h5 className="card-title">{notes.title}</h5>
            <i
              className="fa-regular fa-trash-can mx-2"
              onClick={()=>{deleteNotes(notes._id)}}
            ></i>
            <i className="fa-regular fa-pen-to-square mx-2"></i>
          </div>
          <p className="card-text">{notes.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
