import React, {useContext , useState} from 'react';
import NoteContext from '../context/notes/NoteContext';


const AddNote = () => {
    const context = useContext(NoteContext);
    const {addNotes} = context;
    const [note, setNote] = useState({title:"", description:"", tag :"default"})
    const handleClick = (e)=>{
        e.preventDefault();
        addNotes(note.title, note.description,note.tag);
        setNote({title:"", description:"", tag :""});
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
              value = {note.title}
              aria-describedby="emailHelp"
              placeholder="Title"
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
              id="description"
              name="description"
              value = {note.description}
              placeholder="Description"
              onChange={onChange}
              minLength={5}
              required= {true}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control my-2"
              id="tag" 
              name="tag"
              value = {note.tag}
              placeholder="Tag"
              onChange={onChange}
            />
          </div>
          <button disabled ={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNote