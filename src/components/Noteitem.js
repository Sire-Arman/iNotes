import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {
  const { note , updateNote} = props;
  const context = useContext(NoteContext);
  const { deleteNotes } = context;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex aign-items-left">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-regular fa-trash-can mx-2"
              onClick={()=>{deleteNotes(note._id);
              props.showAlert("Deleted Successfully","success");
              }}
            ></i>
            <i className="fa-regular fa-pen-to-square mx-2"
            onClick={()=>{updateNote(note);
              // props.showAlert("Updated Successfully","success");
            }}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
