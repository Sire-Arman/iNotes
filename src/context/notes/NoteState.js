import { useState } from "react";
 import NoteContext from "./NoteContext";

 const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "6516f27594bfe72436630241",
          "user": "65033d33b159cd757cb9ef9e",
          "title": "Back",
          "description": "Hi Sir!,Welcome back",
          "tag": "back",
          "date": "2023-09-29T15:51:17.400Z",
          "__v": 0
        },
        {
          "_id": "6516f27594bfe72436630242",
          "user": "65033d33b159cd757cb9ef9e",
          "title": "Back",
          "description": "Hi Sir!,Welcome back",
          "tag": "back",
          "date": "2023-09-29T15:51:17.400Z",
          "__v": 0
        },
        {
          "_id": "6516f27594bfe72436632241",
          "user": "65033d33b159cd757cb9ef9e",
          "title": "Back",
          "description": "Hi Sir!,Welcome back",
          "tag": "back",
          "date": "2023-09-29T15:51:17.400Z",
          "__v": 0
        },
        {
          "_id": "6516f275946bfe7a436630241",
          "user": "65033d33b159cd757cb9ef9e",
          "title": "Back",
          "description": "Hi Sir!,Welcome back",
          "tag": "back",
          "date": "2023-09-29T15:51:17.400Z",
          "__v": 0
        },
        {
          "_id": "6516f275947bfe71436630241",
          "user": "65033d33b159cd757cb9ef9e",
          "title": "Back",
          "description": "Hi Sir!,Welcome back",
          "tag": "back",
          "date": "2023-09-29T15:51:17.400Z",
          "__v": 0
        },
        {
          "_id": "6516f257594bfe74436630241",
          "user": "65033d33b159cd757cb9ef9e",
          "title": "Back",
          "description": "Hi Sir!,Welcome back",
          "tag": "back",
          "date": "2023-09-29T15:51:17.400Z",
          "__v": 0
        },
        {
          "_id": "6516f27594bfe7236630241",
          "user": "65033d33b159cd757cb9ef9e",
          "title": "Back",
          "description": "Hi Sir!,Welcome back",
          "tag": "back",
          "date": "2023-09-29T15:51:17.400Z",
          "__v": 0
        },
        {
          "_id": "651f27594bfe73436630241",
          "user": "65033d33b159cd757cb9ef9e",
          "title": "Back",
          "description": "Hi Sir!,Welcome back",
          "tag": "back",
          "date": "2023-09-29T15:51:17.400Z",
          "__v": 0
        },
        {
          "_id": "516f27594bfe72437630241",
          "user": "65033d33b159cd757cb9ef9e",
          "title": "Back",
          "description": "Hi Sir!,Welcome back",
          "tag": "back",
          "date": "2023-09-29T15:51:17.400Z",
          "__v": 0
        },
        {
          "_id": "6516f27594b272436630241",
          "user": "65033d33b159cd757cb9ef9e",
          "title": "Back",
          "description": "Hi Sir!,Welcome back",
          "tag": "back",
          "date": "2023-09-29T15:51:17.400Z",
          "__v": 0
        },
        {
          "_id": "651627594bfe72436030241",
          "user": "65033d33b159cd757cb9ef9e",
          "title": "Back",
          "description": "Hi Sir!,Welcome back",
          "tag": "back",
          "date": "2023-09-29T15:51:17.400Z",
          "__v": 0
        },
        {
          "_id": "6516f28b94bfe7843630244",
          "user": "65033d33b159cd757cb9ef9e",
          "title": "Kya be",
          "description": "Aaj to party h",
          "tag": "Party",
          "date": "2023-09-29T15:51:39.912Z",
          "__v": 0
        }
      ]


      const [notes, setNotes] = useState(notesInitial)
      // Add a Note
      const addNotes = (title , description , tag)=>{
        // API  call 
        console.log("added a new note")
        const note = {
          "_id": "6516f28b94bf843630244",
          "user": "65033d33b159cd757cb9ef9e",
          "title":title,
          "description": description,
          "tag": tag,
          "date": "2023-09-29T15:51:39.912Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }
      // Delete a Note
      const deleteNotes = ()=>{
        
      }
      // Edit a Note   
      const editNotes = ()=>{
        
      }

    return(
        <NoteContext.Provider value ={{notes , addNotes, deleteNotes, editNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
 }


 export default NoteState;