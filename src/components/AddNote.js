import React, {useContext , useState} from 'react';
import NoteContext from '../context/notes/NoteContext';


const AddNote = () => {
    const context = useContext(NoteContext);
    const {addNotes} = context;
    const [note, setNote] = useState({title:"", description:"", tag :""})
    const handleClick = (e)=>{
        e.preventDefault();
        addNotes(note.title, note.description,note.tag);
    }
    const onChange= (e)=>{
        setNote({...note, [e.target.name] : [e.target.value]})
    }
  return (
    <div>
        <div className="container mx-3 my-3">
        <h1> Add Notes</h1>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              placeholder="Title"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Description"
              onChange={onChange}
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNote