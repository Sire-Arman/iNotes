const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

const fetchuser = require("../middlewares/fetchuser");

// Route 1: get all the notes using GET  /apo/notes/fetchallnotes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    // catch will look any unidentifiable error and displays a custom message
    console.log(error.message);
    // res.status sends a bad request along with a message
    res.status(500).json({ error: "Internal Server Error Occured!" });
  }
});

// Route 2: Add new notes using POST /api/notes/addnotes
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "enter a description of atleast 5 characters").isLength(
      { min: 5 }
    ),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      // catch will look any unidentifiable error and displays a custom message
      console.log(error.message);
      // res.status sends a bad request along with a message
      res.status(500).json({ error: "Internal Server Error Occured!" });
    }
  }
);

// Route 3: Update notes using PUT /api/notes/updatenotes
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
     // create a newNote object that tells what user wants to change
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  // find the note to be updated
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Note not found");
  }
  //  authorize correct user
  if (note.id.toString() !== req.params.id) {
    return res.status(401).send("not allowed");
  }
  // update the note
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );

  // return the updated note
  res.json({ note });
  } catch (error) {
    // catch will look any unidentifiable error and displays a custom message
    console.log(error.message);
    // res.status sends a bad request along with a message
    res.status(500).json({ error: "Internal Server Error Occured!" });
  }
 
});

// Route 4: Delete notes using DELETE /api/notes/deletenotes
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  // create a newNote object that tells what user wants to change
  // const newNote = {};
  // if(title){newNote.title = title};
  // if(description){newNote.description = description};
  // if(tag){newNote.tag = tag};
  // find the note to be deleted
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    //  authorize correct user
    if (note.id.toString() !== req.params.id) {
      return res.status(401).send("not allowed");
    }
    // delete the note
    note = await Notes.findByIdAndDelete(req.params.id);

    // return the delete message/note
    res.json({ "success":"Successfully deleted", note:note});
  } catch (error) {
    console.log(error.message);
    // res.status sends a bad request along with a message
    res.status(500).json({ error: "Internal Server Error Occured!" });
  }
});

module.exports = router;
