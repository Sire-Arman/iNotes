import React, {useContext , useState} from 'react';
import NoteContext from '../context/notes/NoteContext';


const AddNote = () => {
    const context = useContext(NoteContext);
    const {addNotes} = context;
    const [note, setNote] = useState({title:"", description:"", tag :"default"})
    const handleClick = (e)=>{
        e.preventDefault();
        addNotes(note.title, note.description,note.tag);
    }
    const onChange= (e)=>{
        setNote({...note, [e.target.name] : e.target.value})
    }
  return (
    <div className="d-flex justify-content-center">
        <div className="container mx-3 my-3 ">
        <h1> Add Notes</h1>
        <form>
          <div className="form-group my-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control my-2"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              placeholder="Title"
              onChange={onChange}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control my-2"
              id="description"
              name="description"
              placeholder="Description"
              onChange={onChange}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control my-2"
              id="tag"
              name="tag"
              placeholder="Tag"
              onChange={onChange}
            />
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