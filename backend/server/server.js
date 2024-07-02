require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.port || 5000;

const noteSchema = new mongoose.Schema({
  title: String,
  content: String
})

const notesModel = mongoose.model('createNotes', noteSchema);

const uri = process.env.MONGO_URI;

if(!uri){
  throw new error('MONGO_URI is not defined in .env file');
}

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.post("/addNotes", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new notesModel({ title, content });
    const savedNote = await newNote.save();
    res.json(savedNote);
    // res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/getNotes", async (req, res) => {
  try {
    const result = await notesModel.find();
    res.json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updateNotes = await notesModel.findByIdAndUpdate(id, { title, content }, { new: true });
    res.json(updateNotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error updating note");
  }
});

app.delete("/delNotes/:id", async (req, res) => {
  try {
    const {id }= req.params;
    const deleteNote = await notesModel.findByIdAndDelete(id);
    if (deleteNote) {
      res.json("Note was deleted");
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
