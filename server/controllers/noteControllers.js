const Note = require("../models/Note");

exports.createNoteController = async (req, res) => {
  try {
    const { title, description } = req.body;

    const note = new Note({
      title: title,
      description: description,
      user: req.user.id,
    });

    await note.save();

    return res.status(200).send({
      success: true,
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in Create note",
    });
  }
};

exports.updateNoteController = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }

    //find the note to be updated and update
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send({
        success: false,
        message: "Not Found",
      });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Note updated",
      updatedNote,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in update note",
    });
  }
};

exports.deleteNoteController = async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "delete note succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in delete note",
    });
  }
};

exports.userNoteController = async (req, res) => {
  try {
    let note = await Note.find({ user: req.user.id });
    return res.status(200).send({
      success: true,
      message: "user notes",
      note,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in user note",
    });
  }
};
