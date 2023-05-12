const express = require("express");
const { createNoteController, updateNoteController, deleteNoteController, userNoteController } = require("../controllers/noteControllers");
const fetchuser = require("../middleware/fetchuser");
const { createNote } = require("../validation/validation");


//router object
const router = express.Router();

//routes handler

//POST || create blog
router.post("/create-note",createNote,fetchuser,createNoteController)

//PUT || update blog
router.put("/update-note/:id",createNote,fetchuser,updateNoteController)


//DELETE || delete blog
router.delete("/delete-note/:id",deleteNoteController)

//GET ||User blog
router.get("/users-note",fetchuser,userNoteController)

module.exports = router;