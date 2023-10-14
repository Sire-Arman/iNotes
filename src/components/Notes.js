import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(NoteContext);
  const ref = useRef(null);
  const refClose = useRef(null);
  const { notes, getNotes, editNotes } = context;
  const [note, setNote] = useState({id: "",etitle:"", edescription:"", etag :"default"})


  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  };


  const handleClick = (e)=>{
    // console.log("updating", note)
    editNotes(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  }


  const onChange= (e)=>{
    setNote({...note, [e.target.name] : e.target.value})
}




  return (
    <>
      <AddNote />
      {/* <!-- Button trigger modal --> */}
      <button ref ={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
</button>
      {/* <!-- Modal --> */}
      <div 
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form>
          <div className="form-group my-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control my-2"
              id="etitle"
              name="etitle"
              aria-describedby="emailHelp"
              placeholder="Title"
              value = {note.etitle}
              onChange={onChange}
              minLength={5}
              required= {true}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control my-2"
              id="edescription"
              name="edescription"
              placeholder="Description"
              value = {note.edescription}
              onChange={onChange}
              minLength={5}
              required= {true}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="description">Tag</label>
            <input
              type="text"
              className="form-control my-2"
              id="etag"
              name="etag"
              placeholder="Tag"
              value = {note.etag}
              onChange={onChange}
            />
          </div>
        </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref = {refClose}
                onClick={handleClick}
              >
                Close
              </button>
              <button disabled ={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3 mx-5 ">
        <h1>Your Notes</h1>
        <div>
        {notes.length === 0 && 'Oops!, found nothing to display'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={()=>updateNote(note)} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
