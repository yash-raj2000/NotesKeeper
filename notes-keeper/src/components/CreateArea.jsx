import React, { useState, useEffect } from "react";
import EditNotes from "./EditNotes";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

function CreateArea() {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try {
      const response = await fetch("https://noteskeeper-s2ul.onrender.com/getNotes");
      const jsonData = await response.json();
      setNotes(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { title: note.title, content: note.content };
      const response = await fetch("https://noteskeeper-s2ul.onrender.com/addNotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setNote({ title: "", content: "" });
        getNotes();
      } else {
        console.error("Failed to add note. Server returned:", response.status);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://noteskeeper-s2ul.onrender.com/delNotes/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setNotes(notes.filter((note) => note._id !== id));
      } else {
        console.error("Failed to delete note. Server returned:", response.status);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <>
      <form className="formContainer" onSubmit={handleSubmit}>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Content"
        ></textarea>
        <button>
          <NoteAddIcon />
        </button>
      </form>

      {notes.map((noteItem) => (
        <div className="container" key={noteItem._id} id={noteItem._id}>
          <h1>{noteItem.title}</h1>
          <p>{noteItem.content}</p>
          <button onClick={() => handleDelete(noteItem._id)}>
            <DeleteTwoToneIcon />
          </button>
          <EditNotes noted={noteItem} id={noteItem._id} update={getNotes} />
        </div>
      ))}
    </>
  );
}

export default CreateArea;
